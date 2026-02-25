import { Router } from "express";
import { FacultyController } from "../controllers/faculty.controller";
import  roleMiddleware  from "../../../middleware/role.middleware";

const router = Router();
const controller = new FacultyController();

router.use(roleMiddleware(["FACULTY"]));

router.get("/student/:studentId", controller.getStudent);
router.get("/department/:cohortId", controller.getDepartmentAggregate);
router.get("/dashboard/:cohortId", controller.getCohortDashboard);

router.post("/feedback", controller.submitFeedback);

export default router;