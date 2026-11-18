import { NavLink } from "react-router";
import type { NavItem } from "../sideBar.types";
import { activeItemClass, itemClass } from "../sideBarStyles";
import { Calendar, House, Inbox, SquareCheck } from "lucide-react";

const navItems: NavItem[] = [
  { id: "home", label: "home", icon: House, path: "/" },
  { id: "myWork", label: "My work", icon: SquareCheck, path: "/myWork" },
  { id: "inbox", label: "Inbox", icon: Inbox, path: "/inbox" },
  {id: "meetings", label: "Meetings", icon: Calendar, path: "/meetings"},
];

const SideBarMainNav = () => {
  return (
    <div className="space-y-0.5">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `${itemClass} ${isActive ? activeItemClass : ""}`
          }
        >
          <item.icon
            aria-hidden="true"
            className="size-4 shrink-0 opacity-80"
          />
          <span className="truncate">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBarMainNav;
