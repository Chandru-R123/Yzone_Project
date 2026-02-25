// src/modules/facilitator/types/project.types.ts
export interface Project {
  id?: string;
  cohortId: string; 
  teamId: string;
  type: 'MINI' | 'MAJOR';
  title: string;
  status?: string; // Default "PENDING"
}