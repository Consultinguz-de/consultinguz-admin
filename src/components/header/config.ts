import { Home, Settings, Users } from "lucide-react";
import type { NavItem } from "./types";

export const HIDDEN_ROUTES = ["/login", "/register-condidates"] as const;

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Bosh sahifa",
    icon: Home,
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
