import { useDialog } from "@/hooks/useDialog";
import { ColumnType } from "@/types";
import { ReactNode } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/ContextMenu";
import ColumnDialog from "./ColumnDialog";
import DeleteColumnAlert from "./DeleteColumnAlert";

type ColumnOptionsContextMenuProps = {
  children: ReactNode;
  column: ColumnType;
};

export const ColumnOptionsContextMenu = ({
  children,
  column,
}: ColumnOptionsContextMenuProps) => {
  const columnDialog = useDialog<HTMLDivElement>();
  const deleteColumnAlertDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem {...columnDialog.triggerProps}>
            Edit Column
          </ContextMenuItem>
          <ContextMenuItem
            className="text-destructive focus:text-destructive"
            {...deleteColumnAlertDialog.triggerProps}
          >
            Delete Column
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <ColumnDialog
        columnToEdit={column}
        onSave={columnDialog.dismiss}
        {...columnDialog.dialogProps}
      />
      <DeleteColumnAlert
        columnToDelete={column}
        {...deleteColumnAlertDialog.dialogProps}
      />
    </>
  );
};
