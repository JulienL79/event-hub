import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { events, locations } from "./index.js";

export const pictures = pgTable("pictures", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("events_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  locationId: uuid("locations_id").references(() => locations.id, {
    onDelete: "cascade",
  }),
  src: varchar("src", { length: 255 }).notNull(),
});
