import type { LucideIcon } from "lucide-react";

export type Page = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Teamspace = {
  id: string;
  label: string;
  icon: LucideIcon;
  pages: Page[];
};

export type VisibleTeamspace = Teamspace & {
  visiblePages: Page[];
};

export type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
};
