import { UserRole } from "./auth.types";

export interface User {
  id?: string;
  tenantId: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}