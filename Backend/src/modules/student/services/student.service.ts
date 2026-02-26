// src/modules/student/services/student.service.ts
import { pool } from "../../../config/db";
import {
  StudentTracker,
  Submission,
  StudentTrackerUpdate,
  SubmissionUpdate,
} from "../../../types/student.types";

class StudentService {
  // -------- STUDENT ----------
  static async createStudent(data: any) {
    const result = await pool.query(
      `INSERT INTO students
       (tenant_id, cohort_id, team_id, name, email, phone, department, enrollment_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        data.tenant_id,
        data.cohort_id,
        data.team_id,
        data.name,
        data.email,
        data.phone || null,
        data.department || null,
        data.enrollment_number || null,
      ]
    );
    return result.rows[0];
  }

  static async updateStudent(id: string, data: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key}=$${idx}`);
      values.push(value);
      idx++;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE students SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async getStudentById(id: string) {
    const result = await pool.query(`SELECT * FROM students WHERE id=$1`, [id]);
    return result.rows[0];
  }

  static async getAllStudents(filters: any) {
    let query = `SELECT * FROM students`;
    const conditions: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(filters)) {
      conditions.push(`${key}=$${idx}`);
      values.push(value);
      idx++;
    }

    if (conditions.length > 0) query += ` WHERE ${conditions.join(" AND ")}`;

    const result = await pool.query(query, values);
    return result.rows;
  }

  // -------- TRACKER ----------
  static async addTracker(data: StudentTracker) {
    const result = await pool.query(
      `INSERT INTO student_trackers
       (student_id, project_id, week, learned_today, issues, plan_for_tomorrow, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [
        data.studentId,
        data.projectId,
        data.week,
        data.learnedToday,
        data.issues || null,
        data.planForTomorrow || null,
        data.status || "ACTIVE",
      ]
    );
    return result.rows[0];
  }

  static async updateTracker(id: string, data: Partial<StudentTrackerUpdate>) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key}=$${idx}`);
      values.push(value);
      idx++;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE student_trackers SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async getTrackersByStudent(studentId: string) {
    const result = await pool.query(
      `SELECT * FROM student_trackers WHERE student_id=$1 ORDER BY created_at DESC`,
      [studentId]
    );
    return result.rows;
  }

  // -------- SUBMISSION ----------
  static async submitProject(data: Submission) {
    const result = await pool.query(
      `INSERT INTO submissions
       (student_id, project_id, file_url, status)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [
        data.studentId,
        data.projectId,
        data.fileUrl,
        data.status || "SUBMITTED",
      ]
    );
    return result.rows[0];
  }

  static async updateSubmission(id: string, data: Partial<SubmissionUpdate>) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key}=$${idx}`);
      values.push(value);
      idx++;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE submissions SET ${fields.join(", ")} WHERE id=$${idx} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  static async getSubmissionsByStudent(studentId: string) {
    const result = await pool.query(
      `SELECT * FROM submissions WHERE student_id=$1 ORDER BY submitted_at DESC`,
      [studentId]
    );
    return result.rows;
  }
}

export default StudentService;