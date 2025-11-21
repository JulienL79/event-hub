"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingController = void 0;
const utils_1 = require("../utils");
exports.pingController = {
  ping: async (request, response) => {
    try {
      utils_1.logger.info(`[GET] Ping demandé`);
      (0, utils_1.APIResponse)(response, null, "OK");
    } catch (error) {
      utils_1.logger.error("Erreur lors du ping: ", error);
      (0, utils_1.APIResponse)(response, null, "Erreur lors du ping", 500);
    }
  },
};
