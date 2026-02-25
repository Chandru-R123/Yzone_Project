export interface FeedbackInput {
  studentId: string;
  cohortId: string;
  comments: string;
  advisoryScores: Record<string, number>;
}