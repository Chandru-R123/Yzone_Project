export interface MentorReview {
  id?: string;
  mentorId: string;
  studentId: string;
  projectId: string;
  submissionId: string;
  rating: number; // 1-5
  feedback?: string;
  status?: string; // default 'APPROVED'
  createdAt?: Date;
}