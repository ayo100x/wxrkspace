import { useMemo, useState } from "react";
import { FileText, FolderKanban, Layers2, UsersRound } from "lucide-react";
import SideBarFooter from "./components/SideBarFooter";
import SideBarHeader from "./components/SideBarHeader";
import SideBarNavigation from "./components/SideBarNavigation";
import SideBarSearch from "./components/SideBarSearch";
import type { Page, Teamspace, VisibleTeamspace } from "./sideBar.types";

type sideBarProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
};

const initialPrivatePages: Page[] = [
  { id: "private-notes", label: "Personal notes", icon: FileText },
  { id: "private-weekly", label: "Weekly review", icon: FileText },
];

const SideBar = ({ activeItem, setActiveItem }: sideBarProps) => {
  const [expanded, setExpanded] = useState(
    () => new Set(["design", "private"]),
  );
  const [privatePages, setPrivatePages] = useState(initialPrivatePages);

  // const [activeItem, setActiveItem] = useState("home");
  const [query, setQuery] = useState("");
  // const [profileOpen, setProfileOpen] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase();

  const addPrivatePage = () => {
    const page = {
      id: `private-${Date.now()}`,
      label: "Untitled page",
      icon: FileText,
    };
    setPrivatePages((current) => [...current, page]);
    setExpanded((current) => new Set(current).add("private"));
    setActiveItem(page.id);
  };

  return (
    <aside className="flex h-dvh w-[min(240px,82vw)] shrink-0 flex-col border-r border-white/8 bg-(--workspace-sidebar) text-[#e8e8e6]">
      {/* Header */}
      <SideBarHeader />

      {/* Search + New */}
      <SideBarSearch
        query={query}
        onQueryChange={setQuery}
        addPrivatePage={addPrivatePage}
      />

      {/* Navigation - currently library & inbox + TEAM SPACES*/}
      <SideBarNavigation
        normalizedQuery={normalizedQuery}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        privatePages}
      />

      {/* Footer */}
      {/* <SideBarFooter
        profileOpen={profileOpen}
        onToggleProfile={() => setProfileOpen((current) => !current)}
        onOpenSettings={() => {
          setActiveItem("settings");
          setProfileOpen(false);
        }}
      /> */}
    </aside>
  );
};

export default SideBar;
