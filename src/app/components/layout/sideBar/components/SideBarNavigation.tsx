import SideBarMainNav from "./SideBarMainNav";
import SideBarTeamspaces from "./SideBarTeamspaces";
import SideBarPrivate from "./SideBarPrivate";
import { useState } from "react";
import { FileText } from "lucide-react";
import type { Page } from "../sideBar.types";

type SideBarNavigationProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
  // filteredPrivatePages: Page[];
  normalizedQuery: string;
  privatePages: Page[];
  addPrivatePage: () => void;
};

const SideBarNavigation = ({
  activeItem,
  setActiveItem,
  normalizedQuery,
  // toggleExpanded,
  privatePages,
  addPrivatePage
}: SideBarNavigationProps) => {
  const [expanded, setExpanded] = useState(
    () => new Set(["design", "private"]),
  );

  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  

  return (
    <nav
      aria-label="Workspace navigation"
      className="mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-2 scrollbar-thin [scrollbar-color:#2e2f2d_transparent]"
    >
      {/* navItems */}
      <SideBarMainNav />

      {/* Teamspaces */}
      <SideBarTeamspaces
        expanded={expanded}
        setExpanded={setExpanded}
        normalizedQuery={normalizedQuery}
        toggleExpanded={toggleExpanded}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Private */}
      <SideBarPrivate
        expanded={expanded}
        setExpanded={setExpanded}
        normalizedQuery={normalizedQuery}
        toggleExpanded={toggleExpanded}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        privatePages={privatePages}
        addPrivatePage={addPrivatePage}
      />
    </nav>
  );
};

export default SideBarNavigation;
