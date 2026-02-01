"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Radio, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
  {
    href: "/settings/telegram-groups",
    label: "Telegram Guruhlari",
    icon: MessageSquare,
  },
  {
    href: "/settings/telegram-channels",
    label: "Telegram Kanallari",
    icon: Radio,
  },
  {
    href: "/settings/email",
    label: "Email sozlamalari",
    icon: Mail,
  },
  {
    href: "/settings/documents",
    label: "Xujjatlar",
    icon: FileText,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0">
      <nav className="flex flex-col gap-1 rounded-lg border bg-card p-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
