import useDelayUnmount from "@/hooks/useDelayUnmount";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { BoardsControlSidebar } from "./BoardsControl";
import ThemeSwitcher from "./ThemeSwitcher";
import { HideSideBarIcon, ShowSideBarIcon } from "./ui/Icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const shouldRenderChild = useDelayUnmount(isOpen, 120);

  return (
    <>
      {!isOpen && (
        <button
          className="clickable absolute bottom-8 flex h-12 w-14 items-center justify-center rounded-r-3xl bg-accent hover:bg-accent-hover max-md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <VisuallyHidden>Show Sidebar</VisuallyHidden>
          <ShowSideBarIcon className="w-4" />
        </button>
      )}
      {shouldRenderChild && (
        <div
          data-state={isOpen ? "open" : "closed"}
          className="flex max-h-[calc(100vh-4.66979375rem)] flex-col justify-between gap-9 overflow-y-auto border-r-[0.0625rem] bg-primary py-[2rem] data-[state=closed]:animate-sidebar-slide-out data-[state=open]:animate-sidebar-slide-in max-md:hidden md:w-[16.25rem] lg:max-h-[calc(100dvh-5.45520625rem)] lg:w-[18.75rem]"
        >
          <BoardsControlSidebar />
          <div>
            <ThemeSwitcher className="mx-4 mt-4 lg:mx-6" />
            <div className="pr-6">
              <button
                className="clickable group mt-2 flex w-full items-center gap-3 rounded-r-3xl px-6 py-[0.875rem] text-[0.9375rem] font-bold hover:bg-secondary-hover hover:text-accent lg:px-8"
                onClick={() => setIsOpen(false)}
              >
                <HideSideBarIcon className="w-[1.125rem] [&_path]:fill-secondary-foreground group-hover:[&_path]:fill-accent" />
                <span>Hide Sidebar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
