import pool from "../../../config/db";
import { Cohort } from "../types/cohort.types";

class CohortRepository {

  static async create(cohort: Cohort) {
    const result = await pool.query(
      `INSERT INTO cohorts 
      (tenant_id, name, start_date, end_date, status)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        cohort.tenantId,
        cohort.name,
        cohort.startDate,
        cohort.endDate,
        cohort.status,
      ]
    );

    return result.rows[0];
  }

  static async getByTenant(tenantId: number) {
    const result = await pool.query(
      "SELECT * FROM cohorts WHERE tenant_id = $1",
      [tenantId]
    );

    return result.rows;
  }
}

export default CohortRepository;
