import { TaskType } from "@/types";
import { Draggable } from "react-beautiful-dnd";
import { Progress } from "./ui/Progress";

type TaskCardProps = {
  data: TaskType;
  themeColor: string;
  index: number;
};

const TaskCard = ({ data, themeColor, index }: TaskCardProps) => {
  const completedSubtasksCount = data.subtasks.filter(
    ({ isCompleted }) => isCompleted,
  ).length;
  const subTasksCount = data.subtasks.length;

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          className="card mb-5 w-full rounded-lg bg-card px-4 py-6 text-left text-card-foreground shadow-card-shadow"
          onClick={() => alert("Item Clicked")}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="text-[0.9375rem] font-bold text-primary-foreground">
            {data.title}
          </div>
          <div className="mt-5 text-xs font-bold">
            <Progress
              value={(completedSubtasksCount / subTasksCount) * 100}
              color={themeColor}
              className="mb-1"
            />
            {completedSubtasksCount} of {subTasksCount} subtasks
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TaskCard;
