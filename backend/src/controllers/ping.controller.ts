import { Request, Response } from "express";
import { APIResponse, logger } from "../utils/index.js";

export const pingController = {
  ping: async (request: Request, response: Response) => {
    try {
      logger.info(`[GET] Ping demandé`);

      APIResponse(response, null, "OK");
    } catch (error: any) {
      logger.error("Erreur lors du ping: ", error);
      APIResponse(response, null, "Erreur lors du ping", 500);
    }
  },
};
