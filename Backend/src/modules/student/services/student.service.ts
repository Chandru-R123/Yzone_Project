import { pool } from "../../../config/db";
import { StudentTracker, Submission } from "../../../types/student.types";

class StudentService {

  static async addTracker(data: StudentTracker) {
    const result = await pool.query(
      `INSERT INTO trackers
       (student_id, project_id, week, progress, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        data.studentId,
        data.projectId,
        data.week,
        data.progress,
        data.status || "PENDING",
      ]
    );

    return result.rows[0];
  }

  static async submitProject(data: Submission) {
    const result = await pool.query(
      `INSERT INTO submissions
       (student_id, project_id, file_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [
        data.studentId,
        data.projectId,
        data.fileUrl,
      ]
    );

    return result.rows[0];
  }

  static async getTrackers(studentId: string) {
    const result = await pool.query(
      "SELECT * FROM trackers WHERE student_id = $1",
      [studentId]
    );

    return result.rows;
  }
}

export default StudentService;