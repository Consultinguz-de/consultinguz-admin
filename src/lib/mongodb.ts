import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("MONGODB_CONNECTION_STRING environment variable is not set");
}

const client = new MongoClient(connectionString);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve the client across HMR
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
