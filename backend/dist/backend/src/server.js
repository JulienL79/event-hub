"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// On  importe le module express qui sera utilisé pour faire tourner notre serveur Noder
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("./middlewares");
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const utils_1 = require("./utils");
const db_init_1 = require("./config/db-init");
// Initialise notre app express
const app = (0, express_1.default)();
app.set("trust proxy", 1);
const {
  PORT,
  // ORIGIN
} = config_1.env;
// app.use(cors({
//     origin: ORIGIN, // Autoriser UNIQUEMENT cette adresse à requêter sur mon serv
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Méthodes HTTPS autorisées (les autres seront bloquées)
//     credentials: true
// }));
app.use((0, cookie_parser_1.default)()); // traiter correctement avec les cookies
app.use(express_1.default.json()); // pour analyser les requêtes JSON
app.use(express_1.default.urlencoded({ extended: true }));
app.use(middlewares_1.requestLogger);
// Appel au router principal
app.use("/", routes_1.default);
const startServer = async () => {
  // Initialise la DB avant de démarrer le serveur
  await (0, db_init_1.initDatabase)();
  app.listen(PORT, () => {
    // Mise en écoute du serveur
    utils_1.logger.info(
      "Le serveur est en écoute sur: http://localhost:" + PORT,
    );
  });
};
startServer();
