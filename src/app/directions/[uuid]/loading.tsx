export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
