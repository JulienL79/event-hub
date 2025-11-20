import {
  pgTable,
  uuid,
  numeric,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { bookings, ticketTypes } from "./";
import { ticketStatusEnum } from "./enums";

export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  ticketTypeId: uuid("ticket_type_id")
    .notNull()
    .references(() => ticketTypes.id, { onDelete: "cascade" }),

  price: numeric("price").notNull(),
  qrCodePath: varchar("qr_code_path", { length: 255 }),
  status: ticketStatusEnum("status").notNull().default("valid"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
