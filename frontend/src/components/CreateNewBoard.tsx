import { cn } from "@/lib/utils";
import BoardDialog from "./dialogs/BoardDialog";
import { BoardIcon } from "./ui/Icons";

type CreateNewBoardProps = {
  className?: string;
};

const CreateNewBoard = ({ className }: CreateNewBoardProps) => {
  return (
    <div className="pr-6">
      <BoardDialog>
        <button
          className={cn(
            "clickable group mt-[0.125rem] flex w-full items-center gap-3 rounded-r-3xl px-6 py-[0.875rem] text-[0.9375rem] font-bold text-accent hover:text-accent-hover lg:px-8",
            className,
          )}
        >
          <BoardIcon className="w-4 [&_path]:fill-accent group-hover:[&_path]:fill-accent-hover" />
          <div>
            <span aria-hidden={true}>+</span> Create New Board
          </div>
        </button>
      </BoardDialog>
    </div>
  );
};

export default CreateNewBoard;
