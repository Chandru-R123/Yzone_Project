import { pool } from "../../../config/db";
import { CreateCohortInput } from "../types/cohort.types";
import { validate as isUuid } from "uuid";

export class CohortRepository {
  async createCohort(data: CreateCohortInput) {
    if (!isUuid(data.tenantId)) {
      throw new Error("Invalid tenant UUID");
    }

    // Optional: verify tenant exists
    const tenant = await pool.query("SELECT id FROM tenants WHERE id = $1", [data.tenantId]);
    if (tenant.rows.length === 0) {
      throw new Error("Tenant not found");
    }

    const query = `
      INSERT INTO cohorts
      (tenant_id, name, start_date, end_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      data.tenantId,
      data.name,
      data.startDate || null,
      data.endDate || null
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}