import { pool } from "../../../config/db";
import { MentorReview } from "../../../types/industryMentor.types";

class MentorReviewService {

  static async createReview(data: MentorReview) {
    const result = await pool.query(
      `INSERT INTO mentor_reviews
       (mentor_id, student_id, project_id, submission_id, rating, feedback, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        data.mentorId,
        data.studentId,
        data.projectId,
        data.submissionId,
        data.rating,
        data.feedback,
        data.status || "APPROVED",
      ]
    );

    return result.rows[0];
  }

  static async getReviewsByMentor(mentorId: string) {
    const result = await pool.query(
      `SELECT * FROM mentor_reviews WHERE mentor_id = $1`,
      [mentorId]
    );

    return result.rows;
  }

  static async getReviewsForStudent(studentId: string) {
    const result = await pool.query(
      `SELECT * FROM mentor_reviews WHERE student_id = $1`,
      [studentId]
    );

    return result.rows;
  }
}

export default MentorReviewService;