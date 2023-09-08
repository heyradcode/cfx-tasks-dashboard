export enum TaskStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export enum SortOption {
  NEWEST = 'Newest',
  OLDEST = 'Oldest',
  A_TO_Z = 'Title A-Z',
  Z_TO_A = 'Title Z-A',
}

export enum ViewMode {
  LIST = 'List',
  GRID = 'Grid',
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  date: string;
}
