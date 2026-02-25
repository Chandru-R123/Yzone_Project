// src/modules/facultyPrincipal/types/faculty.types.ts
export interface Faculty {
  id?: string;                // UUID
  tenantId: string;           // foreign key to tenants table
  name: string;
  email: string;
  phone?: string;
  designation: string;
  department: string;
  experienceYears?: number;
  officeLocation?: string;
  status?: string;            // ACTIVE / INACTIVE
  createdAt?: Date;
}