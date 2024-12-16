import { Router } from "express";

import { simulateError } from "../../controllers/v1/errorController.js";

const router = Router();

router.get("/boom", simulateError);

export default router;
