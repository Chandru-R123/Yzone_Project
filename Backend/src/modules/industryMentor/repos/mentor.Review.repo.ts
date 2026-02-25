import { pool } from "../../../config/db";
import { MentorReview } from "../types/mentorReview.types";

class MentorReviewRepository {
  
  static async create(review: MentorReview) {
    const result = await pool.query(
      `INSERT INTO mentor_reviews
        (mentor_id, student_id, project_id, submission_id, rating, feedback, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        review.mentorId,
        review.studentId,
        review.projectId,
        review.submissionId,
        review.rating,
        review.feedback || null,
        review.status || 'APPROVED'
      ]
    );
    return result.rows[0];
  }

  static async getAllByMentor(mentorId: string) {
    const result = await pool.query(
      "SELECT * FROM mentor_reviews WHERE mentor_id = $1",
      [mentorId]
    );
    return result.rows;
  }

  static async getById(id: string) {
    const result = await pool.query(
      "SELECT * FROM mentor_reviews WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }
}

export default MentorReviewRepository;