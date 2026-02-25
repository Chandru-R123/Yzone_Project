// src/modules/facilitator/routes/facilitator.routes.ts
import { Router } from "express";
import CohortController from "../controllers/cohort.controller";

const router = Router();

// Cohort APIs
router.post("/cohorts", CohortController.create);
router.get("/cohorts/:tenantId", CohortController.getByTenant);

export default router;