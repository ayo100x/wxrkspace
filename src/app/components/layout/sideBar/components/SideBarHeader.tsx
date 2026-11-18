import { ChevronDown } from "lucide-react";
import { itemClass } from "../sideBarStyles";

const SideBarHeader = () => (
  <div className="px-3 pt-2">
    <button
      type="button"
      className={`${itemClass} mt-2.5 h-8 gap-2 text-[#d9dad6]`}
      aria-label="Switch workspace, XY Organisation"
    >
      <span className="flex size-5 shrink-0 items-center justify-center rounded-md border border-white/8 bg-white/5 text-[8px] font-semibold text-[#d9d9d3]">
        XY
      </span>
      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
        XY Organisation
      </span>
      <ChevronDown aria-hidden="true" className="size-3.5 opacity-50" />
    </button>
  </div>
);

export default SideBarHeader;
