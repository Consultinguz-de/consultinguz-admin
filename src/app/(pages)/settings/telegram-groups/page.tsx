import { MessageSquare } from "lucide-react";

export default function TelegramGroupsPage() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Telegram Guruhlari</h2>
      </div>
      <p className="text-muted-foreground">
        Bu yerda Telegram guruhlari sozlamalari joylashadi.
      </p>
    </div>
  );
}
