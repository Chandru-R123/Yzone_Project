// src/modules/facilitator/types/teams.types.ts
export interface Team {
  id?: string;
  cohortId: string; // UUID of cohort
  name: string;
}