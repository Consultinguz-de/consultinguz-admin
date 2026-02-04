import {
  Link,
  MessageSquare,
  MessageCirclePlus,
  Briefcase,
  Trash2,
} from "lucide-react";

export type TabType =
  | "links"
  | "internal-chat"
  | "additional-chat"
  | "employer-chat"
  | "delete";

export const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "links", label: "Linklar", icon: <Link className="h-4 w-4" /> },
  {
    id: "internal-chat",
    label: "Ichki suhbat",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    id: "additional-chat",
    label: "Qo'shimcha suhbat",
    icon: <MessageCirclePlus className="h-4 w-4" />,
  },
  {
    id: "employer-chat",
    label: "Ish beruvchi suhbati",
    icon: <Briefcase className="h-4 w-4" />,
  },
  {
    id: "delete",
    label: "O'chirish",
    icon: <Trash2 className="h-4 w-4" />,
  },
];
