export interface StudentTracker {
  id?: string;
  studentId: string;
  projectId: string;
  week: number;
  progress: string;
  status?: string;
  createdAt?: Date;
}

export interface Submission {
  id?: string;
  studentId: string;
  projectId: string;
  fileUrl: string;
  status?: string;
  submittedAt?: Date;
}