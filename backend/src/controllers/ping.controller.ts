import { Request, Response } from "express";
import { APIResponse, logger } from "../utils";

export const pingController = {
  ping: async (request: Request, response: Response) => {
    try {
      logger.info(`[GET] Ping demandé`);

      APIResponse(response, null, "OK");
    } catch (error: any) {
      logger.error("Erreur lors de la récupération de l'image: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'image",
        500,
      );
    }
  },
};
