// On  importe le module express qui sera utilisé pour faire tourner notre serveur Noder
import express from "express";
// import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "./middlewares";
import router from "./routes";
import { env } from "./config";

// Initialise notre app express
const app = express();
app.set("trust proxy", 1);

const {
  PORT,
  // ORIGIN
} = env;

// app.use(cors({
//     origin: ORIGIN, // Autoriser UNIQUEMENT cette adresse à requêter sur mon serv
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Méthodes HTTPS autorisées (les autres seront bloquées)
//     credentials: true
// }));
app.use(cookieParser()); // traiter correctement avec les cookies
app.use(express.json()); // pour analyser les requêtes JSON
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Appel au router principal
app.use("/", router);

app.listen(PORT, () => {
  // Mise en écoute du serveur
  console.log("Le serveur est en écoute sur: http://localhost:" + PORT);
});
