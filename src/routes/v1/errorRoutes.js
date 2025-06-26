import { Router } from "express";

import { simulateError } from "../../controllers/v1/errorController.js";

const router = Router();

router.get("/bye", simulateError);

export default router;
