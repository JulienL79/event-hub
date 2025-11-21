"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
  path: path_1.default.resolve(__dirname, "../../../.env"),
});
const db_user = process.env.POSTGRES_USER;
const db_password = process.env.POSTGRES_PASSWORD;
const db_name = process.env.POSTGRES_DB;
const db_host = process.env.POSTGRES_HOST;
const db_port = process.env.POSTGRES_PORT;
exports.env = {
  PORT: parseInt(process.env.PORT || "3000"),
  NODE_ENV: process.env.NODE_ENV,
  ORIGIN: process.env.ORIGIN || "http://localhost:5173",
  DATABASE_URL: `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`,
  JWT_SECRET:
    process.env.JWT_SECRET || "SecretTresBienGardeNePasDivulgerPubliquement",
  ROLE_USER_ID: process.env.ROLE_USER_ID || "",
  RESET_MAIL_ADDRESS: process.env.RESET_MAIL_ADDRESS || "reset@gmail.com",
  WEBSITE_URL: process.env.WEBSITE_URL || "A_MODIFIER",
  PASSWORD_RESET_MAIL: process.env.PASSWORD_RESET_MAIL || "reset",
  TZ: process.env.TZ || "Europe/Paris",
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
};
