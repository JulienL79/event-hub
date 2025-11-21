import { Router } from "express";
import pingRouter from "./ping.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/ping", pingRouter);

router.use("/ping", authRouter);

export default router;
