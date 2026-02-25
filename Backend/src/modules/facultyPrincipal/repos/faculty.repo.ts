// src/modules/facultyPrincipal/repos/faculty.repo.ts
import { pool } from "../../../config/db";
import { Faculty } from "../types/faculty.types";

class FacultyRepository {

  static async create(faculty: Faculty) {
    const result = await pool.query(
      `INSERT INTO staff 
        (tenant_id, name, email, phone, designation, department, experience_years, office_location, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        faculty.tenantId,
        faculty.name,
        faculty.email,
        faculty.phone,
        faculty.designation,
        faculty.department,
        faculty.experienceYears || 0,
        faculty.officeLocation || "",
        faculty.status || "ACTIVE",
      ]
    );

    return result.rows[0];
  }

  static async getById(id: string) {
    const result = await pool.query("SELECT * FROM staff WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM staff");
    return result.rows;
  }
}

export default FacultyRepository;