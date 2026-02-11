interface CommentCardProps {
  comment?: string | null;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="rounded-lg border p-4 h-fit">
      <h2 className="font-semibold mb-2">Izoh</h2>
      <p className="text-sm text-muted-foreground">
        {comment ? JSON.stringify(comment) : "Izoh yo'q"}
      </p>
    </div>
  );
}
