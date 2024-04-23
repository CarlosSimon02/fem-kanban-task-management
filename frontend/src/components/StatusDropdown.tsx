import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import { useState } from "react";
import ColumnDialog from "./dialogs/ColumnDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu";
import { ChevronDown } from "./ui/Icons";

type StatusDropdownProps = {
  className?: string;
  currentStatusId?: string;
  onSelect: (statusId: string) => void;
};

const StatusDropdown = ({
  className,
  currentStatusId,
  onSelect,
}: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const columnDialog = useDialog<HTMLDivElement>();

  if (currentBoardIndex === null) return null;
  const currentBoard = boards[currentBoardIndex];
  const currentStatusName = currentStatusId
    ? boards[currentBoardIndex].columns.find(
        (column) => column.id === currentStatusId,
      )?.name
    : null;

  return (
    <>
      <DropdownMenu onOpenChange={(open: boolean) => setIsOpen(open)}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex w-full cursor-pointer items-center justify-between rounded border-[0.09375rem] border-secondary-foreground/25 px-4 py-2 text-sm font-medium focus-visible:border-accent focus-visible:!outline-none disabled:cursor-not-allowed disabled:opacity-50 [&_>_*]:transition-transform",
              currentStatusName
                ? "text-primary-foreground"
                : "placeholder:text-primary-foreground placeholder:opacity-25",
              className,
            )}
          >
            {currentStatusName ? currentStatusName : "Choose an item..."}
            <ChevronDown
              data-state={isOpen ? "open" : "closed"}
              className="ml-[0.375rem] w-[0.625rem] rotate-0 transform data-[state=open]:rotate-180"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="!w-[calc(100vw-5rem)] !max-w-[26rem] min-[27.5em]:!w-[calc(100vw-6rem)]">
          {currentBoard.columns.map((column) => (
            <DropdownMenuItem
              key={column.id}
              onSelect={() => onSelect(column.id)}
            >
              {column.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="text-accent hover:!text-accent"
            {...columnDialog.triggerProps}
          >
            Add New Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ColumnDialog
        onSave={() => columnDialog.dismiss()}
        {...columnDialog.dialogProps}
      />
    </>
  );
};

export default StatusDropdown;
