export interface Cohort {
  id?: string;
  tenantId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  facilitatorId?: string;
  createdAt?: Date;
}