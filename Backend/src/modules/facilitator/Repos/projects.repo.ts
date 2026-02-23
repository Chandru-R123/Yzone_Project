import { pool } from "../../../config/db";
import { CreateProjectInput } from "../types/project.types";

export class ProjectsRepository {
  createProject(data: CreateProjectInput) {
    const query = `
      INSERT INTO projects (cohort_id, team_id, type, title, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    return pool.query(query, [data.cohortId, data.teamId, data.type, data.title, data.status || 'PENDING'])
      .then(r => r.rows[0]);
  }

  getProjectsByTeam(teamId: string) {
    return pool.query(`SELECT * FROM projects WHERE team_id = $1`, [teamId]).then(r => r.rows);
  }
}