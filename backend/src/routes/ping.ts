import { Router } from "express";
import { pingController } from "../controllers";

const pingRouter = Router();

pingRouter.get("/", pingController.ping);

export default pingRouter;
