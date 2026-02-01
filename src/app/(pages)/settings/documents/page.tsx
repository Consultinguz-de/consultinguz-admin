import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Xujjatlar</h2>
      </div>
      <p className="text-muted-foreground">
        Bu yerda xujjatlar sozlamalari joylashadi.
      </p>
    </div>
  );
}
