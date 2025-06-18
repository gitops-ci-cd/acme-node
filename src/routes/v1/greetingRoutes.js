import { Router } from "express";

import { greet } from "../../controllers/v1/greetingController.js";

const router = Router();

router.get("/hello1", greet);

export default router;
