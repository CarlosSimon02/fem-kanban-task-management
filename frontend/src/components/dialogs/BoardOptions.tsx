import { useDialog } from "@/hooks/useDialog";
import { BoardType } from "@/types";
import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/ContextMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropDownMenu";
import BoardDialog from "./BoardDialog";
import DeleteBoardAlert from "./DeleteBoardAlert";

type BoardOptionsContextMenuProps = {
  children: ReactNode;
  board: BoardType;
};

export const BoardOptionsContextMenu = ({
  children,
  board,
}: BoardOptionsContextMenuProps) => {
  const boardDialog = useDialog<HTMLDivElement>();
  const deleteBoardAlertDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem {...boardDialog.triggerProps}>
            Edit Board
          </ContextMenuItem>
          <ContextMenuItem
            className="text-destructive focus:text-destructive"
            {...deleteBoardAlertDialog.triggerProps}
          >
            Delete Board
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <BoardDialog
        boardToEdit={board}
        onSave={boardDialog.dismiss}
        {...boardDialog.dialogProps}
      />
      <DeleteBoardAlert
        boardToDelete={board}
        {...deleteBoardAlertDialog.dialogProps}
      />
    </>
  );
};

type BoardOptionsDropdownMenuProps = {
  children: ReactNode;
  board: BoardType;
};

export const BoardOptionsDropdownMenu = ({
  children,
  board,
}: BoardOptionsDropdownMenuProps) => {
  const boardDialog = useDialog<HTMLDivElement>();
  const deleteBoardAlertDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem {...boardDialog.triggerProps}>
            Edit Board
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            {...deleteBoardAlertDialog.triggerProps}
          >
            Delete Board
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BoardDialog
        boardToEdit={board}
        onSave={boardDialog.dismiss}
        {...boardDialog.dialogProps}
      />
      <DeleteBoardAlert
        boardToDelete={board}
        {...deleteBoardAlertDialog.dialogProps}
      />
    </>
  );
};
