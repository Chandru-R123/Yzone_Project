// src/modules/facilitator/routes/facilitator.routes.ts
import { Router } from "express";
import { CohortController } from "../controllers/cohort.controller";
import { TeamsController } from "../controllers/teams.controller";
import { ProjectsController } from "../controllers/projects.controller";
import * as SessionController from "../controllers/session.controller";
import * as AttendanceController from "../controllers/attendance.controller";

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

facilitatorRoutes.get(
  "/cohorts/:cohortId/today-session",
  SessionController.getTodaySession
);

facilitatorRoutes.post(
  "/sessions/:sessionId/attendance",
  AttendanceController.markAttendance
);

facilitatorRoutes.get(
  "/sessions/:sessionId/attendance",
  AttendanceController.getAttendance
);
