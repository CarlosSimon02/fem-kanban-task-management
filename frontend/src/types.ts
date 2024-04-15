export type SubtaskType = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskType[];
};

export type ColumnType = {
  id: string;
  name: string;
  tasks: TaskType[];
  color: string;
};

export type BoardType = {
  id: string;
  name: string;
  columns: ColumnType[];
};
