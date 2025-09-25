
export enum Status {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}

export interface Filters {
  status: Status | '';
  priority: Priority | '';
  assignee: string;
}

export interface SortConfig {
  key: keyof Issue | null;
  direction: 'ascending' | 'descending';
}

export interface PaginationState {
  page: number;
  pageSize: number;
}
