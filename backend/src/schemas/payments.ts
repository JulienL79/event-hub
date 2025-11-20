import {
  pgTable,
  uuid,
  numeric,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { bookings, invoices } from "./";
import { paymentStatusEnum } from "./enums";

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id").references(() => bookings.id, {
    onDelete: "set null",
  }),
  invoiceId: uuid("invoice_id").references(() => invoices.id, {
    onDelete: "set null",
  }),

  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  stripeChargeId: varchar("stripe_charge_id", { length: 255 }),
  currency: varchar("currency", { length: 10 }).notNull().default("EUR"),
  amount: numeric("amount").notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paidAt: timestamp("paid_at", { withTimezone: false }),
  failureReason: text("failure_reason"),
  reattendait: timestamp("reattendait", { withTimezone: false })
    .notNull()
    .defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
