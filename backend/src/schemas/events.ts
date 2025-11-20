import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { users, categories, locations } from "./";
import { eventStatusEnum } from "./enums";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  organizerId: uuid("organizer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  locationId: uuid("location_id").references(() => locations.id, {
    onDelete: "set null",
  }),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),

  dateStart: timestamp("date_start").notNull(),
  dateEnd: timestamp("date_end").notNull(),

  capacity: integer("capacity").notNull(),
  priceMin: numeric("price_min").notNull(),

  status: eventStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
