import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { roleEnum } from "./enums";

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: roleEnum("name").notNull(),
});
