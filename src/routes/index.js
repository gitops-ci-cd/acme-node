import { Router } from "express";
import greetingRoutes from "./greetingRoutes.js";
import errorRoutes from "./errorRoutes.js";

const router = Router();

// Mount routes
router.use(greetingRoutes);
router.use(errorRoutes);

export default router;
