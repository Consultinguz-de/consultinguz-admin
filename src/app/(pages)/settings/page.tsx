import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Sozlamalar</h1>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Umumiy sozlamalar</h2>
          <p className="text-muted-foreground">
            Bu yerda tizim sozlamalari joylashadi.
          </p>
        </div>
      </div>
    </div>
  );
}
