<<<<<<< HEAD
import { Tenant } from "../types/tenant.types";
import pool from "../../../config/db";
=======
import { Tenant } from "../../../types/tenant.types";
import { pool }from "../../../config/db";
>>>>>>> 344fe00 (hello)

class TenantRepository {

  static async getAll() {
    const result = await pool.query("SELECT * FROM tenants");
    return result.rows;
  }

  static async getById(id: number) {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async create(tenant: Tenant) {
    const result = await pool.query(
      `INSERT INTO tenants 
      (college_name, principal_name, email, phone, address, status)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        tenant.collegeName,
        tenant.principalName,
        tenant.email,
        tenant.phone,
        tenant.address,
        tenant.status,
      ]
    );

    return result.rows[0];
  }
}

export default TenantRepository;
