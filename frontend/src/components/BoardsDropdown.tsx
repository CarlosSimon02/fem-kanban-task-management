import useDelayUnmount from "@/hooks/useDelayUnmount";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Portal } from "@radix-ui/react-portal";
import { useState } from "react";
import { BoardsControlDropdown } from "./BoardsControl";
import ThemeSwitcher from "./ThemeSwitcher";
import { ChevronDown } from "./ui/Icons";

const BoardsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const shouldRenderChild = useDelayUnmount(isOpen, 140);
  const rootElement = document.querySelector("#root");
  const currentBoardIndexIsNumber =
    currentBoardIndex !== null && currentBoardIndex !== undefined;

  return (
    <>
      <div
        className={cn(
          "text-left text-xl font-bold max-md:hidden lg:text-2xl",
          "min-w-0 max-w-[30ch] flex-shrink overflow-hidden text-ellipsis whitespace-nowrap",
          currentBoardIndexIsNumber
            ? "text-primary-foreground"
            : "text-secondary-foreground",
        )}
      >
        {currentBoardIndexIsNumber
          ? boards[currentBoardIndex].name
          : "No Boards Found"}
      </div>
      <Portal container={rootElement as HTMLElement} asChild>
        {shouldRenderChild && (
          <div
            data-state={isOpen ? "open" : "closed"}
            className="absolute left-0 top-0 z-[9] h-screen w-screen bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          />
        )}
      </Portal>
      <DropdownMenu.Root onOpenChange={(open: boolean) => setIsOpen(open)}>
        <DropdownMenu.Trigger asChild>
          <button className="flex min-w-[0] cursor-pointer items-center gap-1 text-left text-lg font-bold text-primary-foreground md:hidden [&_>_*]:transition-transform">
            <span
              className={cn(
                "max-w-[20ch] overflow-hidden text-ellipsis whitespace-nowrap",
                currentBoardIndexIsNumber
                  ? "text-primary-foreground"
                  : "text-secondary-foreground",
              )}
            >
              {currentBoardIndexIsNumber
                ? boards[currentBoardIndex].name
                : "No Boards Found"}
            </span>
            <ChevronDown
              data-state={isOpen ? "open" : "closed"}
              className="ml-[0.375rem] w-2 flex-shrink-0 rotate-0 transform data-[state=open]:rotate-180"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-50 ml-4 flex max-h-[calc(100vh-5rem)] w-screen min-w-[8rem] max-w-[16.5rem] flex-col overflow-y-auto rounded-lg bg-popover py-4 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-[22.5em]:ml-[3.375rem]"
            sideOffset={30}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <BoardsControlDropdown />
            <ThemeSwitcher className="mx-4 mt-4" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default BoardsDropdown;
