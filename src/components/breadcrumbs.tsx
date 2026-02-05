import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-sm text-muted-foreground", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  {isFirst && <Home className="h-3.5 w-3.5" />}
                  <span className="max-w-[200px] truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5 max-w-[200px] truncate",
                    isLast && "font-medium text-foreground",
                  )}
                >
                  {isFirst && <Home className="h-3.5 w-3.5" />}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground/70" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
