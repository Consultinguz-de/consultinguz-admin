"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, Home, User, Settings, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutDialog } from "@/components/logout-dialog";
import { cn } from "@/lib/utils";

// =============================================================================
// Types
// =============================================================================

import { UserRole } from "@/types/common";

interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  roles?: UserRole[];
}

// =============================================================================
// Configuration
// =============================================================================

const HIDDEN_ROUTES = ["/login", "/register-condidates"] as const;

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Bosh sahifa",
    icon: Home,
    roles: ["super_admin", "admin", "limited_admin"],
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
    roles: ["super_admin", "admin", "limited_admin"],
  },
  {
    href: "/settings",
    label: "Sozlamalar",
    icon: Settings,
    roles: ["super_admin", "admin", "limited_admin"],
  },
  {
    href: "/candidates",
    label: "Kondidatlar",
    icon: Users,
    roles: ["super_admin", "admin", "limited_admin"],
  },
];

// =============================================================================
// Utilities
// =============================================================================

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNavItemVisible(item: NavItem, userRole: UserRole): boolean {
  if (!item.roles || item.roles.length === 0) {
    return true;
  }
  return item.roles.includes(userRole);
}

function shouldHideHeader(pathname: string): boolean {
  return HIDDEN_ROUTES.some((route) => pathname === route);
}

// =============================================================================
// Components
// =============================================================================

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
}

function NavLink({ item, isActive }: NavLinkProps) {
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

// =============================================================================
// Header Component
// =============================================================================

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

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LogoutDialog />
        </div>
      </div>
    </header>
  );
}
