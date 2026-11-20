import { ChevronDown, ChevronRight, FileText, FolderKanban, Layers2, Plus, UsersRound } from "lucide-react";
import type { Teamspace, VisibleTeamspace } from "../sideBar.types";
import { activeItemClass, itemClass } from "../sideBarStyles";
import { useMemo, useState } from "react";



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

type SideBarTeamspacesProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
  expanded: Set<string>;
  normalizedQuery: string;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: any) => void;
};

const SideBarTeamspaces = ({
  activeItem,
  setActiveItem,
  expanded,
  setExpanded,
  normalizedQuery,
  toggleExpanded,
}: SideBarTeamspacesProps) => {

  const [teamspaces, setTeamspaces] = useState(initialTeamspaces);
  

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

  const addTeamspace = () => {
    const teamspace = {
      id: `teamspace-${Date.now()}`,
      label: "New teamspace",
      icon: UsersRound,
      pages: [],
    };
    setTeamspaces((current) => [...current, teamspace]);
    setExpanded((current: any) => new Set(current).add(teamspace.id));
  };

  return (
    <section className="mt-5" aria-labelledby="teamspaces-heading">
      {/* TEAMSPACE HEADING AND + ADD BUTTON */}
      <div className="mb-1 flex h-5 items-center justify-between px-2">
        <h2
          id="teamspaces-heading"
          className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#6a6c67]"
        >
          Teamspaces
        </h2>
        <button
          type="button"
          onClick={addTeamspace}
          aria-label="Create teamspace"
          className="flex size-5 items-center justify-center rounded-md text-[#6a6c67] transition-colors hover:bg-white/[0.06] hover:text-[#d4d5d1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6b6d68]"
        >
          <Plus aria-hidden="true" className="size-3.5" />
        </button>
      </div>

      <div className="space-y-0.5">
        {filteredTeamspaces.map((teamspace) => {
          const isExpanded =
            expanded.has(teamspace.id) || normalizedQuery.length > 0;
          const Icon = teamspace.icon;

          return (
            <div key={teamspace.id}>
              <button
                type="button"
                onClick={() => toggleExpanded(teamspace.id)}
                aria-expanded={isExpanded}
                className={itemClass}
              >
                {isExpanded ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-3.5 shrink-0 opacity-50"
                  />
                ) : (
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 opacity-50"
                  />
                )}
                <Icon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 opacity-70"
                />
                <span className="min-w-0 flex-1 truncate">
                  {teamspace.label}
                </span>
              </button>

              {isExpanded && (
                <div className="ml-3.5 space-y-0.5 border-l border-white/6 pl-2.5">
                  {teamspace.visiblePages.map((page) => {
                    const PageIcon = page.icon;
                    const isActive = activeItem === page.id;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => setActiveItem(page.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`${itemClass} h-7 gap-2 text-[12.5px] font-normal ${isActive ? activeItemClass : ""}`}
                      >
                        <PageIcon
                          aria-hidden="true"
                          className="size-3.5 shrink-0 opacity-60"
                        />
                        <span className="truncate">{page.label}</span>
                      </button>
                    );
                  })}
                  {teamspace.pages.length === 0 && (
                    <p className="px-2 py-1 text-[11px] text-[#6a6c67]">
                      No pages yet
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SideBarTeamspaces;
