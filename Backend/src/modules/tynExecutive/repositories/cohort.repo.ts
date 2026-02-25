// src/modules/tynExecutive/repositories/cohort.repo.ts
import { pool } from "../../../config/db";
import { Cohort } from "../types/cohort.types";

class CohortRepository {

  // Create a new cohort
  static async create(cohort: Cohort) {
    const result = await pool.query(
      `INSERT INTO cohorts 
        (tenant_id, name, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        cohort.tenantId,
        cohort.name,
        cohort.startDate || null,
        cohort.endDate || null,
        cohort.status || "ONGOING",
      ]
    );
    return result.rows[0];
  }

  // Get all cohorts by tenant UUID
  static async getByTenant(tenantId: string) {
    const result = await pool.query(
      `SELECT * FROM cohorts WHERE tenant_id = $1`,
      [tenantId]
    );
    return result.rows;
  }
}

export default CohortRepository;