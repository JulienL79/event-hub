import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { bookings } from "./";
import { invoiceStatusEnum } from "./enums";

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),

  bookingId: uuid("booking_id").references(() => bookings.id, {
    onDelete: "set null",
  }),

  invoice_number: varchar("invoice_number", { length: 255 }).notNull(),
  total_amount: numeric("total_amount").notNull(),

  billingName: varchar("billing_name", { length: 255 }).notNull(),
  billingEmail: varchar("billing_email", { length: 255 }).notNull(),
  billingAddressStreet: varchar("billing_address_street", {
    length: 255,
  }).notNull(),
  billingAddressCity: varchar("billing_address_city", {
    length: 255,
  }).notNull(),
  billingAddressZip: varchar("billing_address_zip", { length: 5 }).notNull(),
  billingAddressCountry: varchar("billing_address_country", {
    length: 255,
  }).notNull(),

  event_title: varchar("event_title", { length: 255 }).notNull(),
  event_start_date: timestamp("event_start_date").notNull(),
  event_end_date: timestamp("event_end_date").notNull(),
  organizerName: varchar("organizer_name", { length: 255 }).notNull(),

  status: invoiceStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
