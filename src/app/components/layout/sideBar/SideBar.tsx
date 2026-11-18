import { useMemo, useState } from "react";
import { FileText, FolderKanban, Layers2, UsersRound } from "lucide-react";
import SideBarFooter from "./components/SideBarFooter";
import SideBarHeader from "./components/SideBarHeader";
import SideBarNavigation from "./components/SideBarNavigation";
import SideBarSearch from "./components/SideBarSearch";
import type { Page, Teamspace, VisibleTeamspace } from "./sideBar.types";

const initialTeamspaces: Teamspace[] = [
  {
    id: "design",
    label: "Design",
    icon: Layers2,
    pages: [
      { id: "design-overview", label: "Overview", icon: FileText },
      { id: "design-projects", label: "Projects", icon: FolderKanban },
      { id: "design-research", label: "Research notes", icon: FileText },
    ],
  },
  {
    id: "product",
    label: "Product",
    icon: FolderKanban,
    pages: [
      { id: "product-roadmap", label: "Roadmap", icon: FileText },
      { id: "product-launches", label: "Launch plans", icon: FileText },
    ],
  },
  {
    id: "engineering",
    label: "Engineering",
    icon: UsersRound,
    pages: [
      { id: "engineering-docs", label: "Documentation", icon: FileText },
      { id: "engineering-sprints", label: "Sprint planning", icon: FileText },
    ],
  },
];

const initialPrivatePages: Page[] = [
  { id: "private-notes", label: "Personal notes", icon: FileText },
  { id: "private-weekly", label: "Weekly review", icon: FileText },
];

type sideBarProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
};

const SideBar = ({ activeItem, setActiveItem }: sideBarProps) => {
  const [teamspaces, setTeamspaces] = useState(initialTeamspaces);
  const [privatePages, setPrivatePages] = useState(initialPrivatePages);
  const [expanded, setExpanded] = useState(
    () => new Set(["design", "private"]),
  );
  // const [activeItem, setActiveItem] = useState("home"); 
  const [query, setQuery] = useState("");
  // const [profileOpen, setProfileOpen] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredTeamspaces: VisibleTeamspace[] = useMemo(
    () =>
      teamspaces.flatMap((teamspace) => {
        const matchingPages = teamspace.pages.filter((page) =>
          page.label.toLocaleLowerCase().includes(normalizedQuery),
        );
        const matchesTeamspace = teamspace.label
          .toLocaleLowerCase()
          .includes(normalizedQuery);

        if (
          normalizedQuery &&
          !matchesTeamspace &&
          matchingPages.length === 0
        ) {
          return [];
        }

        return [
          {
            ...teamspace,
            visiblePages:
              normalizedQuery && !matchesTeamspace
                ? matchingPages
                : teamspace.pages,
          },
        ];
      }),
    [normalizedQuery, teamspaces],
  );

  // observe .
  const filteredPrivatePages = privatePages.filter((page) =>
    page.label.toLocaleLowerCase().includes(normalizedQuery),
  );

  // observe .
  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // observe .
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

  // observe .
  const addTeamspace = () => {
    const teamspace = {
      id: `teamspace-${Date.now()}`,
      label: "New teamspace",
      icon: UsersRound,
      pages: [],
    };
    setTeamspaces((current) => [...current, teamspace]);
    setExpanded((current) => new Set(current).add(teamspace.id));
  };

  return (
    <aside className="flex h-dvh w-[min(240px,82vw)] shrink-0 flex-col border-r border-white/[0.08] bg-[var(--workspace-sidebar)] text-[#e8e8e6]">
      {/* Header */}
      <SideBarHeader />

      {/* Search + New */}
      <SideBarSearch
        query={query}
        onQueryChange={setQuery}
        onAddPrivatePage={addPrivatePage}
      />

      {/* Navigation - currently library & inbox + TEAM SPACES*/}
      <SideBarNavigation
        expanded={expanded}
        filteredTeamspaces={filteredTeamspaces}
        filteredPrivatePages={filteredPrivatePages}
        normalizedQuery={normalizedQuery}
        addTeamspace={addTeamspace}
        addPrivatePage={addPrivatePage}
        toggleExpanded={toggleExpanded}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
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
