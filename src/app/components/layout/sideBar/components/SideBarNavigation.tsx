import type { Page, VisibleTeamspace } from "../sideBar.types";
import { activeItemClass, itemClass } from "../sideBarStyles";
import { Link, NavLink } from "react-router";
import SideBarMainNav from "./SideBarMainNav";
import SideBarTeamspaces from "./SideBarTeamspaces";
import SideBarPrivate from "./SideBarPrivate";

type SideBarNavigationProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
  expanded: Set<string>;
  filteredTeamspaces: VisibleTeamspace[];
  filteredPrivatePages: Page[];
  normalizedQuery: string;
  addTeamspace: () => void;
  addPrivatePage: () => void;
  toggleExpanded: (id: string) => void;
};

const SideBarNavigation = ({
  activeItem,
  setActiveItem,
  expanded,
  filteredTeamspaces,
  filteredPrivatePages,
  normalizedQuery,
  addTeamspace,
  addPrivatePage,
  toggleExpanded,
}: SideBarNavigationProps) => (
  <nav
    aria-label="Workspace navigation"
    className="mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-2 scrollbar-thin [scrollbar-color:#2e2f2d_transparent]"
  >
    {/* navItems */}
    <SideBarMainNav />

    {/* Teamspaces */}
    <SideBarTeamspaces
      expanded={expanded}
      filteredTeamspaces={filteredTeamspaces}
      normalizedQuery={normalizedQuery}
      addTeamspace={addTeamspace}
      toggleExpanded={toggleExpanded}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    />

    {/* Private */}
    {/* <SideBarPrivate
      expanded={expanded}
      filteredPrivatePages={filteredPrivatePages}
      normalizedQuery={normalizedQuery}
      addPrivatePage={addPrivatePage}
      toggleExpanded={toggleExpanded}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    /> */}
  </nav>
);

export default SideBarNavigation;
