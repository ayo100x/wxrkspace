import { ChevronDown, ChevronRight, FileText, Plus } from "lucide-react";
import { activeItemClass, itemClass } from "../sideBarStyles";
import type { Page } from "../sideBar.types";
import { useState } from "react";



type SideBarPrivateProps = {
  activeItem: string;
  setActiveItem: (id: string) => void;
  expanded: Set<string>;
  normalizedQuery: string;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: any) => void;
  privatePages: Page[];
  addPrivatePage: () => void;
};

const SideBarPrivate = ({
  activeItem,
  setActiveItem,
  expanded,
  setExpanded,
  normalizedQuery,
  toggleExpanded,
  privatePages,
  addPrivatePage,
}: SideBarPrivateProps) => {
  

  const filteredPrivatePages = privatePages.filter((page) =>
    page.label.toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
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
        aria-expanded={expanded.has("private") || normalizedQuery.length > 0}
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
        <FileText aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
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
  );
};

export default SideBarPrivate;
