import { Router } from "express";
import TenantController from "../controllers/tenant.controller";
import CohortController from "../controllers/cohort.controller";
import authMiddleware from "../../../middleware/auth.middleware";
import roleMiddleware from "../../../middleware/role.middleware";

const router = Router();

// Protect all routes
router.use(authMiddleware);
router.use(roleMiddleware(["TYN_EXECUTIVE"]));

// Tenant APIs
router.get("/tenants", TenantController.getAll);
router.get("/tenants/:id", TenantController.getOne);
router.post("/tenants", TenantController.create);

// Cohort APIs
router.post("/cohorts", CohortController.create);
router.get("/cohorts/:tenantId", CohortController.getByTenant);

export default router;
