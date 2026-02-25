import { pool } from "../../../config/db";

export class FacultyRepository {

  async getStudentById(studentId: string) {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [studentId]
    );
    return result.rows[0];
  }

  async getDepartmentAggregate(cohortId: string) {
    const result = await pool.query(
      `SELECT cohort_id, COUNT(*) as total_students
       FROM user_roles
       WHERE cohort_id = $1 AND role = 'STUDENT'
       GROUP BY cohort_id`,
      [cohortId]
    );
    return result.rows[0];
  }

  async getCohortDashboard(cohortId: string) {
    const result = await pool.query(
      `SELECT * FROM assessments
       WHERE student_id IN (
         SELECT user_id FROM user_roles
         WHERE cohort_id = $1 AND role = 'STUDENT'
       )`,
      [cohortId]
    );
    return result.rows;
  }

  async isReviewWindowActive(cohortId: string) {
    const result = await pool.query(
      `SELECT * FROM review_windows
       WHERE cohort_id = $1
       AND NOW() BETWEEN start_time AND end_time`,
      [cohortId]
    );
    return result.rows.length > 0;
  }

  async submitFeedback(
    studentId: string,
    evaluatorId: string,
    scores: any,
    comments: string
  ) {
    const result = await pool.query(
      `INSERT INTO assessments
       (id, student_id, type, scores, comments, evaluator_id)
       VALUES (gen_random_uuid(), $1, 'FACULTY_REVIEW', $2, $3, $4)
       RETURNING *`,
      [studentId, scores, comments, evaluatorId]
    );
    return result.rows[0];
  }
}