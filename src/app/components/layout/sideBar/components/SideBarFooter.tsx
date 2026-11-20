import { ChevronDown } from "lucide-react";
import { itemClass } from "../sideBarStyles";

type SideBarFooterProps = {
  profileOpen: boolean;
  onToggleProfile: () => void;
  onOpenSettings: () => void;
};

const SideBarFooter = ({
  profileOpen,
  onToggleProfile,
  onOpenSettings,
}: SideBarFooterProps) => (
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
            onClick={onOpenSettings}
            className={`${itemClass} h-8 text-[12.5px] font-normal`}
          >
            Account settings
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={onToggleProfile}
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
);

export default SideBarFooter;
