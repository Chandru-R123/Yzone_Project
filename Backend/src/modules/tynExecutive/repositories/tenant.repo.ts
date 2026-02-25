import { pool } from "../../../config/db";

interface TenantInput {
  college_name: string;
  principal_name: string;
  email: string;
  phone?: string;
  address?: string;
  status?: string;
}

class TenantRepository {

  static async createTenant(data: TenantInput) {
    const result = await pool.query(
      `INSERT INTO tenants
       (college_name, principal_name, email, phone, address, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.college_name,
        data.principal_name,
        data.email,
        data.phone || null,
        data.address || null,
        data.status || "ACTIVE",
      ]
    );

    return result.rows[0];
  }

  static async getTenant(id: string) {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async getTenants() {
    const result = await pool.query("SELECT * FROM tenants ORDER BY created_at DESC");
    return result.rows;
  }
}

export default TenantRepository;