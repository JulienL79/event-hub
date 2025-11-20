import { pgTable, uuid, numeric, timestamp } from "drizzle-orm/pg-core";
import { users, events } from "./";
import { bookingStatusEnum } from "./enums";

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  eventId: uuid("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),

  status: bookingStatusEnum("status").notNull().default("pending"),
  total_amount: numeric("total_amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
