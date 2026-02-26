// src/modules/facilitator/routes/facilitator.routes.ts
import { Router } from "express";
import { CohortController } from "../controllers/cohort.controller";
import { TeamsController } from "../controllers/teams.controller";
import { ProjectsController } from "../controllers/projects.controller";

export const facilitatorRoutes = Router();

// Cohorts
facilitatorRoutes.post("/cohorts", CohortController.create);
facilitatorRoutes.get("/cohorts/:tenantId", CohortController.getByTenant);
facilitatorRoutes.get("/cohorts", CohortController.getAll); // ✅ Get all cohorts

// Teams
facilitatorRoutes.post("/teams", TeamsController.create);
facilitatorRoutes.get("/teams/:cohortId", TeamsController.getByCohort);

// Projects
facilitatorRoutes.post("/projects", ProjectsController.createProject);
facilitatorRoutes.get("/projects/cohort/:cohortId", ProjectsController.getProjectsByCohort);
facilitatorRoutes.get("/projects/team/:teamId", ProjectsController.getProjectsByTeam);