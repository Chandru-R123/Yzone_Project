export interface Tracker {
  id?: string;
  studentId: string;
  projectId: string;
  week: number;
  progress: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewerId?: string;
  feedback?: string;
  createdAt?: Date;
}