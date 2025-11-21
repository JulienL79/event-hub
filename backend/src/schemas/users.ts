import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { roles } from "./index.js";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleId: uuid("role_id")
    .notNull()
    .references(() => roles.id, { onDelete: "cascade" }),

  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  birthdate: timestamp("birthdate").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),

  addressStreet: varchar("address_street", { length: 255 }).notNull(),
  addressCity: varchar("address_city", { length: 255 }).notNull(),
  addressZip: varchar("address_zip", { length: 5 }).notNull(),
  addressCountry: varchar("address_country", { length: 255 }).notNull(),
  coordLat: varchar("coord_lat", { length: 255 }).notNull(),
  coordLon: varchar("coord_lon", { length: 255 }).notNull(),

  isEmail: boolean("is_email").notNull().default(true),
  isSms: boolean("is_sms").notNull().default(true),

  language: varchar("language", { length: 10 }).notNull().default("fr"),
  isDarkMode: boolean("is_dark_mode").notNull().default(false),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),

  tempTokenId: uuid("temp_token_id").defaultRandom().notNull(),
});
