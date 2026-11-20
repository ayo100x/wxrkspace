import { Command, Plus, Search } from "lucide-react";
import { itemClass } from "../sideBarStyles";

type SideBarSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
  addPrivatePage: () => void;
};

const SideBarSearch = ({
  query,
  onQueryChange,
  addPrivatePage,
}: SideBarSearchProps) => (
  <div className="px-3 pt-3">
    <label className="group/search flex h-8 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 text-[#7f817c] transition-colors focus-within:border-white/[0.12] focus-within:bg-white/[0.04]">
      <Search aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search"
        aria-label="Search pages"
        className="min-w-0 flex-1 bg-transparent text-[12.5px] text-[#e4e5e1] outline-none placeholder:text-[#6f716c]"
      />
      <span className="flex h-[18px] shrink-0 items-center gap-0.5 rounded border border-white/8 px-1 text-[10px] leading-none text-[#6f716c]">
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
);

export default SideBarSearch;
