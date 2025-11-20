import { Router } from "express";
import pingRouter from "./ping";
import authRouter from "./auth.route";

const router = Router();

router.use("/ping", pingRouter);

router.use("/ping", authRouter);

export default router;
