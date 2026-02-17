export interface Cohort {
  id: number;
  tenantId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: "PLANNED" | "ACTIVE" | "COMPLETED";
}
