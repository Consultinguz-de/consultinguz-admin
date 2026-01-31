"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        const token = await user.getIdToken();
        document.cookie = `auth-token=${token}; path=/; max-age=3600; SameSite=Strict`;

        await saveUserToDatabase(user);
      } else {
        document.cookie = "auth-token=; path=/; max-age=0";
      }
    });

    return () => unsubscribe();
  }, []);

  const saveUserToDatabase = async (user: User) => {
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
      }),
    });
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    document.cookie = "auth-token=; path=/; max-age=0";
  };

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    console.log("updateUserProfile called", { displayName, photoURL });
    if (!auth.currentUser) throw new Error("User not authenticated");

    console.log("Updating Firebase profile...");
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
    console.log("Firebase profile updated");

    console.log("Saving to Firestore...");
    await saveUserToDatabase(auth.currentUser);
    console.log("Firestore saved");

    await auth.currentUser.reload();
    setUser(null);
    setUser(auth.currentUser);
    console.log("updateUserProfile completed");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
