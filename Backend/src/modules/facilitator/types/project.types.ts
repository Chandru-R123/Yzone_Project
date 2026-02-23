export interface CreateProjectInput {
  cohortId: string;
  teamId: string;
  type: 'MINI' | 'MAJOR';
  title: string;
  status?: string;
}