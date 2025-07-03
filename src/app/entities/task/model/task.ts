export interface TaskBase {
  title: string;
  isCompleted: boolean;
}

export interface Task extends TaskBase {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}
