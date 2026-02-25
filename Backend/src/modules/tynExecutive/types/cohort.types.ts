// src/modules/tynExecutive/types/cohort.types.ts
export interface Cohort {
  tenantId: string;      // UUID string
  name: string;
  startDate?: string;    // ISO date string
  endDate?: string;      // ISO date string
  status?: string;       // e.g., "ONGOING", "COMPLETED"
}