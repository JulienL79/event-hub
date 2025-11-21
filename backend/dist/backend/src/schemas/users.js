"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.users = (0, pg_core_1.pgTable)("users", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  roleId: (0, pg_core_1.uuid)("role_id")
    .notNull()
    .references(() => _1.roles.id, { onDelete: "cascade" }),
  firstname: (0, pg_core_1.varchar)("firstname", { length: 255 }).notNull(),
  lastname: (0, pg_core_1.varchar)("lastname", { length: 255 }).notNull(),
  birthdate: (0, pg_core_1.timestamp)("birthdate").notNull(),
  email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
  phoneNumber: (0, pg_core_1.varchar)("phone_number", { length: 20 })
    .notNull()
    .unique(),
  password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
  addressStreet: (0, pg_core_1.varchar)("address_street", {
    length: 255,
  }).notNull(),
  addressCity: (0, pg_core_1.varchar)("address_city", {
    length: 255,
  }).notNull(),
  addressZip: (0, pg_core_1.varchar)("address_zip", { length: 5 }).notNull(),
  addressCountry: (0, pg_core_1.varchar)("address_country", {
    length: 255,
  }).notNull(),
  coordLat: (0, pg_core_1.varchar)("coord_lat", { length: 255 }).notNull(),
  coordLon: (0, pg_core_1.varchar)("coord_lon", { length: 255 }).notNull(),
  isEmail: (0, pg_core_1.boolean)("is_email").notNull().default(true),
  isSms: (0, pg_core_1.boolean)("is_sms").notNull().default(true),
  language: (0, pg_core_1.varchar)("language", { length: 10 })
    .notNull()
    .default("fr"),
  isDarkMode: (0, pg_core_1.boolean)("is_dark_mode").notNull().default(false),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
  tempTokenId: (0, pg_core_1.uuid)("temp_token_id").defaultRandom().notNull(),
});
