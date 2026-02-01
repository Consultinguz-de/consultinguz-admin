"use client";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import type { UserRole } from "@/types/common";
import { NavLink } from "./nav-link";
import { UserMenu } from "./user-menu";
import { NAV_ITEMS } from "./config";
import { isRouteActive, isNavItemVisible, shouldHideHeader } from "./utils";

interface HeaderProps {
  userRole?: UserRole;
}

export function Header({ userRole = "limited_admin" }: HeaderProps) {
  const pathname = usePathname();

  if (shouldHideHeader(pathname)) {
    return null;
  }

  const visibleNavItems = NAV_ITEMS.filter((item) =>
    isNavItemVisible(item, userRole),
  );

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-tight">Dashboard</span>
          <span className="text-sm text-muted-foreground">
            Consulting Admin
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={isRouteActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
