import { Router } from "express";
import { CohortController } from "../controllers/cohort.controller";
import { TeamsController } from "../controllers/teams.controller";
import { ProjectsController } from "../controllers/projects.controller";

const router = Router();

const cohortController = new CohortController();

// Create Cohort
router.post(
  "/cohorts",
  (req, res) => cohortController.create(req, res)
);

const controller = new TeamsController();
router.post("/teams", (req, res) => controller.createTeam(req, res));

const controller2 = new ProjectsController();
router.post("/projects", (req, res) => controller2.createProject(req, res));

export default router;