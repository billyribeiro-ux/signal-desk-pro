export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "member";
  avatar?: string;
  createdAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
