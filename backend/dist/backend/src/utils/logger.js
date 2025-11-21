"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
  level: "info", // niveau de log min pour capturer (peut etre info warn debug error etc)
  format: winston_1.format.combine(
    winston_1.format.colorize(), // Colorise le niveau de log en fct de sa gravité (level)
    winston_1.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), // Ajoute un timestamp formaté à chaque log
    winston_1.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] - [${level}]: ${message}`; // Format custom pour afficher le log
    }),
  ),
  transports: [
    new winston_1.transports.Console(), // Affiche les logs sur la console en couleur
    new winston_1.transports.File({
      filename: "logs/error.log",
      level: "error",
    }), // Fichier de log où seront ttes les error
    new winston_1.transports.File({ filename: "logs/combined.log" }), // Fichier où seront TOUT les logs (sans exception)
  ],
});
