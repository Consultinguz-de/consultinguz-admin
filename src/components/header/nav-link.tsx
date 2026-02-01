"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem } from "./types";

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

export function NavLink({ item, isActive }: NavLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-accent",
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {item.label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}
