// src/modules/facilitator/types/cohort.types.ts
export interface Cohort {
  id?: string;
  tenantId: string;   // UUID of tenant
  name: string;
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
}