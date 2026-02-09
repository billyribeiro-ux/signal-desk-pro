export type ClientStatus = "active" | "onboarding" | "paused" | "churned";

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ClientStatus;
  industry: string;
  phone?: string;
  website?: string;
  notes?: string;
  projectCount: number;
  totalRevenue: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ClientStatus | "";
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
