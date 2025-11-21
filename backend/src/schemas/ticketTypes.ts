import { pgTable, uuid, varchar, numeric, integer } from "drizzle-orm/pg-core";
import { events } from "./index.js";

export const ticketTypes = pgTable("ticket_types", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price").notNull(),
  quota: integer("quota").notNull(),
});
