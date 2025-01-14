import { Router as r } from "express";
import { Router, RequestHandler } from "express-serve-static-core"

import { greet } from "../../controllers/v1/greetingController.js";

const router: Router = r();
const greetHandler: RequestHandler = greet;

router.get("/hello", greetHandler);

export default router;
