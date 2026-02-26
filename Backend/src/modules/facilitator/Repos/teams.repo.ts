import { pool } from "../../../config/db";
import { Team } from "../types/teams.types";

export class TeamsRepo {
  async createTeam(data: Team) {
    const { cohortId, name } = data;
    const result = await pool.query(
      `INSERT INTO teams (cohort_id, name) VALUES ($1,$2) RETURNING *`,
      [cohortId, name]
    );
    return result.rows[0];
  }

  async getTeamsByCohort(cohortId: string) {
    const result = await pool.query(
      `SELECT * FROM teams WHERE cohort_id = $1`,
      [cohortId]
    );
    return result.rows;
  }
}