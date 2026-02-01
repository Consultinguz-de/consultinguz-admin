import type { NavItem } from "./types";
import type { UserRole } from "@/types/common";
import { HIDDEN_ROUTES } from "./config";

export function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavItemVisible(item: NavItem, userRole: UserRole): boolean {
  if (!item.roles || item.roles.length === 0) {
    return true;
  }
  return item.roles.includes(userRole);
}

export function shouldHideHeader(pathname: string): boolean {
  return HIDDEN_ROUTES.some((route) => pathname === route);
}
