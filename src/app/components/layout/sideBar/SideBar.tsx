import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Command,
  FileText,
  FolderKanban,
  Inbox,
  Layers2,
  Plus,
  Search,
  Settings,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type Page = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type Teamspace = {
  id: string;
  label: string;
  icon: LucideIcon;
  pages: Page[];
};

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

const navItems = [
  { id: "library", label: "Library", icon: BookOpen },
  { id: "inbox", label: "Inbox", icon: Inbox },
];

const itemClass =
  "group flex h-8 w-full min-w-0 items-center gap-2 rounded-lg px-2 text-left text-[13px] font-medium text-[#a1a29e] transition-all duration-150 hover:bg-white/[0.04] hover:text-[#ececea] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6b6d68]/";
const activeItemClass = "bg-white/[0.06] text-[#f4f4f2] hover:bg-white/[0.08]";

const SideBar = () => {
  const [teamspaces, setTeamspaces] = useState(initialTeamspaces);
  const [privatePages, setPrivatePages] = useState(initialPrivatePages);
  const [expanded, setExpanded] = useState(
    () => new Set(["design", "private"]),
  );
  const [activeItem, setActiveItem] = useState("design-overview");
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredTeamspaces = useMemo(
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
  const filteredPrivatePages = privatePages.filter((page) =>
    page.label.toLocaleLowerCase().includes(normalizedQuery),
  );

  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
    <aside className="flex h-dvh w-[min(240px,82vw)] shrink-0 flex-col border-r border-white/[0.06] bg-[#161716] text-[#e8e8e6]">
      {/* Header */}
      <div className="px-3 pt-2">

        {/* <div className="flex h-7 items-center gap-2.5 px-1.5">
          <div
            aria-hidden="true"
            className="flex size-5 items-center justify-center rounded-md bg-[#e6e7e3] text-[12px] font-bold leading-none text-[#1a1b19]"
          >
            w
          </div>
          <span className="text-[14px] font-semibold tracking-[-0.03em] text-[#f2f2f0]">
            wxrkspace
          </span>
        </div> */}

        <button
          type="button"
          className={`${itemClass} mt-2.5 h-8 gap-2 text-[#d9dad6]`}
          aria-label="Switch workspace, Acme Studio"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-[#2e2f2d] text-[10px] font-semibold text-[#c9cbc5]">
            A
          </span>
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
            Acme Studio
          </span>
          <ChevronDown aria-hidden="true" className="size-3.5 opacity-50" />
        </button>
      </div>

      {/* Search + New */}
      <div className="px-3 pt-3">
        <label className="group/search flex h-8 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 text-[#7f817c] transition-colors focus-within:border-white/[0.12] focus-within:bg-white/[0.04]">
          <Search aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search pages"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] text-[#e4e5e1] outline-none placeholder:text-[#6f716c]"
          />
          <span className="flex h-[18px] shrink-0 items-center gap-0.5 rounded border border-white/[0.08] px-1 text-[10px] leading-none text-[#6f716c]">
            <Command aria-hidden="true" className="size-2.5" />K
          </span>
        </label>

        <button
          type="button"
          onClick={addPrivatePage}
          className={`${itemClass} mt-1 text-[#b8bab5]`}
        >
          <Plus aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
          <span className="truncate">New page</span>
        </button>
      </div>

      {/* Navigation - currently library & inbox + TEAM SPACES*/} 
      <nav
        aria-label="Workspace navigation"
        className="mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-2 scrollbar-thin [scrollbar-color:#2e2f2d_transparent]"
      >
        {/* navItems */}
        <div className="space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveItem(id)}
              aria-current={activeItem === id ? "page" : undefined}
              className={`${itemClass} ${activeItem === id ? activeItemClass : ""}`}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0 opacity-80" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        {/* Teamspaces */}
        <section className="mt-5" aria-labelledby="teamspaces-heading">
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
                    <div className="ml-3.5 space-y-0.5 border-l border-white/[0.06] pl-2.5">
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

        {/* Private */}
        <section className="mt-4" aria-labelledby="private-heading">
          <div className="mb-1 flex h-5 items-center justify-between px-2">
            <h2
              id="private-heading"
              className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#6a6c67]"
            >
              Private
            </h2>
            <button
              type="button"
              onClick={addPrivatePage}
              aria-label="Create private page"
              className="flex size-5 items-center justify-center rounded-md text-[#6a6c67] transition-colors hover:bg-white/[0.06] hover:text-[#d4d5d1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6b6d68]"
            >
              <Plus aria-hidden="true" className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => toggleExpanded("private")}
            aria-expanded={
              expanded.has("private") || normalizedQuery.length > 0
            }
            className={itemClass}
          >
            {expanded.has("private") || normalizedQuery.length > 0 ? (
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
            <FileText
              aria-hidden="true"
              className="size-3.5 shrink-0 opacity-70"
            />
            <span className="truncate">My pages</span>
          </button>

          {(expanded.has("private") || normalizedQuery.length > 0) && (
            <div className="ml-3.5 space-y-0.5 border-l border-white/[0.06] pl-2.5">
              {filteredPrivatePages.map((page) => {
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
            </div>
          )}
        </section>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-white/[0.06] px-3 py-2.5">

        {/* <button
          type="button"
          onClick={() => setActiveItem("settings")}
          aria-current={activeItem === "settings" ? "page" : undefined}
          className={`${itemClass} ${activeItem === "settings" ? activeItemClass : ""}`}
        >
          <Settings aria-hidden="true" className="size-4 shrink-0 opacity-80" />
          <span className="truncate">Settings</span>
        </button> */}

        <div className="relative mt-0.5">
          {profileOpen && (
            <div
              role="menu"
              aria-label="Account menu"
              className="absolute bottom-[calc(100%+6px)] left-0 z-10 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#1c1d1b] p-1 shadow-2xl shadow-black/40"
            >
              <div className="px-2.5 py-2">
                <p className="text-[12.5px] font-medium text-[#ececea]">
                  Alex Morgan
                </p>
                <p className="mt-0.5 truncate text-[11px] text-[#7a7c77]">
                  alex@acme.studio
                </p>
              </div>
              <div className="my-0.5 border-t border-white/[0.06]" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setActiveItem("settings");
                  setProfileOpen(false);
                }}
                className={`${itemClass} h-8 text-[12.5px] font-normal`}
              >
                Account settings
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setProfileOpen((current) => !current)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            className={`${itemClass} h-9 gap-2.5`}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2f302e] text-[10.5px] font-medium text-[#d6d7d3]">
              AM
            </span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-[#d0d1cd]">
              Alex Morgan
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`size-3.5 shrink-0 opacity-50 transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
