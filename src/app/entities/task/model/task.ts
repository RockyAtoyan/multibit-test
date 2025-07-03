export interface TaskBase {
  title: string;
  description?: string;
  isCompleted: boolean;
}

export interface Task extends TaskBase {
  id: string;
  createdAt: Date;
}
