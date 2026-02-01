import { Settings } from "lucide-react";
import { SettingsSidebar } from "@/components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Sozlamalar</h1>
      </div>

      <div className="flex gap-6">
        <SettingsSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
