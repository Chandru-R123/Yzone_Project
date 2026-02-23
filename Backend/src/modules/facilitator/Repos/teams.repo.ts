import { pool } from "../../../config/db";
import { CreateTeamInput } from "../types/teams.types";

export class TeamsRepository {
  createTeam(data: CreateTeamInput) {
    const query = `
      INSERT INTO teams (cohort_id, name)
      VALUES ($1, $2)
      RETURNING *;
    `;
    return pool.query(query, [data.cohortId, data.name]).then(r => r.rows[0]);
  }

  getTeamsByCohort(cohortId: string) {
    return pool.query(`SELECT * FROM teams WHERE cohort_id = $1`, [cohortId]).then(r => r.rows);
  }
}