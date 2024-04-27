import { useBoardStore } from "@/store/boardStore";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";
import Column from "./Column";
import ColumnDialog from "./dialogs/ColumnDialog";

const Board = () => {
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const updateBoard = useBoardStore((state) => state.updateBoard);

  if (currentBoardIndex === null || currentBoardIndex === undefined) return;

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const boardToUpdate = { ...boards[currentBoardIndex] };
    const sourceColumnIndex = boardToUpdate.columns.findIndex(
      (column) => column.id === source.droppableId,
    );
    const destinationColumnIndex = boardToUpdate.columns.findIndex(
      (column) => column.id === destination.droppableId,
    );

    if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
      const draggedTask = boardToUpdate.columns[sourceColumnIndex].tasks.find(
        (task) => task.id === draggableId,
      );

      if (draggedTask) {
        draggedTask.statusId = boardToUpdate.columns[destinationColumnIndex].id;

        boardToUpdate.columns[sourceColumnIndex].tasks.splice(source.index, 1);

        boardToUpdate.columns[destinationColumnIndex].tasks.splice(
          destination.index,
          0,
          draggedTask,
        );
      }

      updateBoard(boardToUpdate);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <ScrollContainer
        className="grid h-fit max-h-[calc(100vh-4.66979375rem)] min-h-full flex-1 cursor-move grid-flow-col content-start justify-start gap-6 overflow-auto p-6 pb-0 lg:max-h-[calc(100dvh-5.45520625rem)]"
        hideScrollbars={false}
        ignoreElements={".card"}
        nativeMobileScroll={true}
      >
        {boards[currentBoardIndex].columns.map((column, index) => (
          <Column key={index} data={column} />
        ))}
        <ColumnDialog>
          <button className="clickable mb-6 mt-12 min-h-80 w-[17.5rem] rounded-lg bg-new-column-bg text-2xl font-bold hover:text-accent">
            <span aria-hidden>+</span>New Column
          </button>
        </ColumnDialog>
      </ScrollContainer>
    </DragDropContext>
  );
};

export default Board;
