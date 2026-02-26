// common/types/studentTracker.types.ts

export interface StudentTracker {
  id?: string;              // optional UUID
  studentId: string;        // reference to the student
  projectId: string;        // reference to the project
  week: number;             // current week number
  learnedToday: string;     // what student learned today
  issues?: string;          // any issues faced (optional)
  planForTomorrow?: string; // plan for next day (optional)
  status?: string;          // ACTIVE / INACTIVE / COMPLETED etc.
  createdAt?: Date;         // timestamp
}

// For updating a student's tracker entry
export interface StudentTrackerUpdate {
  id: string;               // required to identify which tracker to update
  learnedToday?: string;
  issues?: string;
  planForTomorrow?: string;
  status?: string;
}

// Submission interface
export interface Submission {
  id?: string;
  studentId: string;
  projectId: string;
  fileUrl: string;
  status?: string;       // SUBMITTED / PENDING etc.
  submittedAt?: Date;
}

// For updating a submission
export interface SubmissionUpdate {
  id: string;              // required to identify which submission to update
  fileUrl?: string;
  status?: string;
  submittedAt?: Date;
}