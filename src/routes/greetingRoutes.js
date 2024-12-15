import { Router } from "express";
import { greet } from "../controllers/greetingController.js";

const router = Router();

router.get("/hello", greet);

export default router;
