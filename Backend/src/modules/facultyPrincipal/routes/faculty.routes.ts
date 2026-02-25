// src/modules/facultyPrincipal/routes/faculty.routes.ts
import { Router } from "express";
import FacultyController from "../controllers/faculty.controller";
// If you don’t use JWT, you can comment these out
// import authMiddleware from "../../../middleware/auth.middleware";
// import roleMiddleware from "../../../middleware/role.middleware";

const router = Router();

// Optional: Protect routes
// router.use(authMiddleware);
// router.use(roleMiddleware(["FACULTY_PRINCIPAL"]));

router.post("/", FacultyController.create);
router.get("/", FacultyController.getAll);
router.get("/:id", FacultyController.getOne);

export default router;