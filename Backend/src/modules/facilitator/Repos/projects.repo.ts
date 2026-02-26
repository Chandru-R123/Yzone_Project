import { pool } from "../../../config/db";
import { Project } from "../types/project.types";

export class ProjectsRepo {
  async createProject(data: Project) {
    const { cohortId, teamId, type, title, status } = data;
    const result = await pool.query(
      `INSERT INTO projects (cohort_id, team_id, type, title, status)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [cohortId, teamId, type, title, status || "PENDING"]
    );
    return result.rows[0];
  }

  async getProjectsByCohort(cohortId: string) {
    const result = await pool.query(
      `SELECT * FROM projects WHERE cohort_id = $1`,
      [cohortId]
    );
    return result.rows;
  }

  async getProjectsByTeam(teamId: string) {
    const result = await pool.query(
      `SELECT * FROM projects WHERE team_id = $1`,
      [teamId]
    );
    return result.rows;
  }
}