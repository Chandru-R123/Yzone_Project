import { Tenant } from "../types/tenant.types";
import { pool } from "../../../config/db";

class TenantRepository {

  static async getAll(): Promise<Tenant[]> {
    const result = await pool.query("SELECT * FROM tenants");
    return result.rows;
  }

  static async getById(id: string): Promise<Tenant | null> {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );

    return result.rows[0] || null;
  }

  static async create(tenant: Tenant): Promise<Tenant> {
    const result = await pool.query(
      `INSERT INTO tenants 
      (college_name, principal_name, email, phone, address, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
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