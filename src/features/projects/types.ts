export type ProjectStatus = "draft" | "active" | "in_review" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  clientName: string;
  status: ProjectStatus;
  priority: "low" | "medium" | "high" | "urgent";
  startDate: string;
  dueDate: string;
  completedDate?: string;
  budget: number;
  spent: number;
  progress: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ProjectStatus | "";
  sort?: string;
  order?: "asc" | "desc";
}
