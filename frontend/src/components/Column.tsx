import { cn } from "@/lib/utils";
import { ColumnType } from "@/types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { ColumnOptionsContextMenu } from "./dialogs/ColumnOptions";

type ColumnProps = {
  data: ColumnType;
};

const Column = ({ data }: ColumnProps) => {
  return (
    <ColumnOptionsContextMenu column={data}>
      <div className="flex min-h-full w-[17.5rem] flex-col gap-6">
        <div className="flex items-center gap-3">
          <span
            className="h-[0.9375rem] w-[0.9375rem] rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-bold tracking-[0.15rem]">
            {data.name} ({data.tasks.length})
          </span>
        </div>
        <Droppable droppableId={data.id}>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              className={cn(
                "w-full flex-1",
                !data.tasks.length &&
                  "mb-6 rounded-lg border-[0.09375rem] border-dashed border-border",
              )}
              {...provided.droppableProps}
            >
              {data.tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  data={task}
                  themeColor={data.color}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </ColumnOptionsContextMenu>
  );
};

export default Column;
