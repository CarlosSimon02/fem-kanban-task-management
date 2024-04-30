import { useSetMyBoards } from "@/api/MyBoardsApi";
import { useSetMyCurrentBoardIndex } from "@/api/MyCurrentBoardIndexApi";
import { cn } from "@/lib/utils";
import { useBoardStore } from "@/store/boardStore";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import BoardsControlLabel from "./BoardsControlLabel";
import CreateNewBoard from "./CreateNewBoard";
import { BoardOptionsContextMenu } from "./dialogs/BoardOptions";
import { DragIcon } from "./ui/Icons";

const useBoardsControl = () => {
  const boards = useBoardStore((state) => state.boards);
  const currentBoardIndex = useBoardStore((state) => state.currentBoardIndex);
  const { setCurrentBoardIndex } = useSetMyCurrentBoardIndex();
  const { setBoards } = useSetMyBoards();
  const valueChangeHandler = (value: string) => {
    setCurrentBoardIndex(boards.findIndex((board) => board.id === value));
  };

  const dragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newBoards = [...boards];
    const draggedBoard = boards.find((board) => board.id === draggableId);

    newBoards.splice(source.index, 1);
    draggedBoard && newBoards.splice(destination.index, 0, draggedBoard);

    if (currentBoardIndex !== null && currentBoardIndex !== undefined) {
      const currentBoardId = boards[currentBoardIndex].id;

      setBoards(newBoards);
      currentBoardId &&
        setCurrentBoardIndex(
          newBoards.findIndex((board) => board.id === currentBoardId),
        );
    }
  };

  return {
    boards,
    currentBoardIndex,
    valueChangeHandler,
    dragEndHandler,
  };
};

export const BoardsControlSidebar = () => {
  const { boards, currentBoardIndex, valueChangeHandler, dragEndHandler } =
    useBoardsControl();

  return (
    <div>
      <BoardsControlLabel boardsCount={boards.length} />
      <DragDropContext onDragEnd={dragEndHandler}>
        <form>
          <Droppable droppableId="boards-sidebar">
            {(provided, snapshot) => (
              <RadioGroup.Root
                value={
                  currentBoardIndex !== null && currentBoardIndex !== undefined
                    ? boards[currentBoardIndex].id
                    : undefined
                }
                onValueChange={valueChangeHandler}
              >
                <div
                  ref={provided.innerRef}
                  className={cn(
                    "pr-6",
                    snapshot.isDraggingOver &&
                      "[&_*]:hover:bg-transparent [&_*]:hover:text-inherit",
                  )}
                  {...provided.droppableProps}
                >
                  {boards.map((board, index) => (
                    <Draggable
                      key={board.id}
                      draggableId={board.id}
                      index={index}
                    >
                      {(provided) => (
                        <BoardOptionsContextMenu board={board}>
                          <RadioGroup.Item
                            ref={provided.innerRef}
                            value={board.id}
                            className="clickable group flex w-full items-center gap-3 rounded-r-3xl px-6 py-[0.875rem] text-left text-[0.9375rem] font-bold hover:bg-secondary-hover hover:text-accent data-[state=checked]:!bg-accent data-[state=checked]:!text-accent-foreground lg:px-8"
                            {...provided.draggableProps}
                          >
                            <div {...provided.dragHandleProps}>
                              <DragIcon className="w-4 [&_path]:stroke-secondary-foreground group-hover:[&_path]:stroke-accent group-data-[state=checked]:[&_path]:stroke-accent-foreground" />
                            </div>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                              {board.name}
                            </span>
                          </RadioGroup.Item>
                        </BoardOptionsContextMenu>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </RadioGroup.Root>
            )}
          </Droppable>
        </form>
      </DragDropContext>
      <CreateNewBoard />
    </div>
  );
};

export const BoardsControlDropdown = () => {
  const { boards, currentBoardIndex, valueChangeHandler, dragEndHandler } =
    useBoardsControl();

  return (
    <>
      <BoardsControlLabel boardsCount={boards.length} />
      <DragDropContext onDragEnd={dragEndHandler}>
        <Droppable droppableId="boards-dropdown">
          {(provided, snapshot) => (
            <DropdownMenu.RadioGroup
              ref={provided.innerRef}
              value={
                currentBoardIndex !== null && currentBoardIndex !== undefined
                  ? boards[currentBoardIndex].id
                  : undefined
              }
              className={cn(
                "pr-6",
                snapshot.isDraggingOver &&
                  "[&>*]:hover:bg-transparent [&>*]:hover:text-inherit",
              )}
              onValueChange={valueChangeHandler}
              {...provided.droppableProps}
            >
              {boards.map((board, index) => (
                <Draggable key={board.id} draggableId={board.id} index={index}>
                  {(provided, snapshot) => (
                    <DropdownMenu.RadioItem
                      ref={provided.innerRef}
                      value={board.id}
                      className={cn(
                        "clickable group flex w-full cursor-pointer items-center gap-3 rounded-r-3xl px-6 py-[0.875rem] text-left text-[0.9375rem] font-bold !outline-none hover:bg-secondary-hover hover:text-accent data-[state=checked]:!bg-accent data-[state=checked]:!text-accent-foreground lg:px-8",
                        snapshot.isDragging && "!left-auto !top-auto",
                      )}
                      {...provided.draggableProps}
                    >
                      <div {...provided.dragHandleProps}>
                        <DragIcon className="w-4 [&_path]:stroke-secondary-foreground group-hover:[&_path]:stroke-accent group-data-[state=checked]:[&_path]:stroke-accent-foreground" />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {board.name}
                      </span>
                    </DropdownMenu.RadioItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DropdownMenu.RadioGroup>
          )}
        </Droppable>
      </DragDropContext>
      <CreateNewBoard />
    </>
  );
};
