import { Mail } from "lucide-react";

export default function EmailSettingsPage() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Email sozlamalari</h2>
      </div>
      <p className="text-muted-foreground">
        Bu yerda Email sozlamalari joylashadi.
      </p>
    </div>
  );
}
