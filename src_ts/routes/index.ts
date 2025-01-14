// Converted to TypeScript - Add meaningful types below
import { Router } from "express";

import v1Routes from "./v1/index.js";

const router = Router();

// Mount versioned routes
router.use("/api/v1", v1Routes);

export default router;
