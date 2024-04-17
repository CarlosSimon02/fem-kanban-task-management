import { useBoardStore } from "@/store/boardStore";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import BoardsDropdown from "./BoardsDropdown";
import { BoardOptionsDropdownMenu } from "./dialogs/BoardOptions";
import { Logo, LogoMobile, Plus, VerticalEllipsis } from "./ui/Icons";

const Header = () => {
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const boards = useBoardStore((state) => state.boards);

  return (
    <header className="z-10 flex bg-primary md:border-b-[0.0625rem]">
      <div className="flex items-center px-4 py-4 md:w-[16.25rem] md:border-r-[0.0625rem] md:px-6 lg:w-[18.75rem] lg:px-8">
        <LogoMobile className="w-6 md:hidden" />
        <Logo className="w-[9.533125rem] max-md:hidden [&_path]:fill-primary-foreground" />
        <VisuallyHidden.Root>
          <h1>Kanban Task Management</h1>
        </VisuallyHidden.Root>
      </div>
      <div className="flex flex-1 items-center justify-between py-4 pr-4 md:px-6 lg:px-8">
        <BoardsDropdown />
        {currentBoardIndex !== null && (
          <div className="flex gap-1">
            <button className="clickable rounded-full bg-accent px-[1.125rem] py-[0.625rem] text-accent-foreground hover:bg-accent-hover md:px-6 md:py-[0.9375rem] lg:px-6 lg:py-[0.9375rem]">
              <span className="font-bold">
                <div className="max-lg:hidden">
                  <span aria-hidden>+</span> Add New Task
                </div>
                <Plus className="w-3 lg:hidden" />
                <VisuallyHidden.Root className="lg:hidden">
                  Add New Task
                </VisuallyHidden.Root>
              </span>
            </button>
            <BoardOptionsDropdownMenu board={boards[currentBoardIndex]}>
              <button className="clickable group -mr-3 px-3 md:-mr-5 md:px-5">
                <VerticalEllipsis className="h-4 md:h-5 [&_g]:fill-secondary-foreground group-hover:[&_g]:fill-primary-foreground" />
                <VisuallyHidden.Root>More Actions</VisuallyHidden.Root>
              </button>
            </BoardOptionsDropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;