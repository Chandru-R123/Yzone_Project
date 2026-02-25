export interface JwtPayload {
  userId: string;
  tenantId: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    tenantId: string;
  };
}

export type UserRole =
  | "TYN_EXECUTIVE"
  | "FACILITATOR"
  | "STUDENT"
  | "INDUSTRY_MENTOR"
  | "FACULTY_PRINCIPAL";