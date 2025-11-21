import {
  pgTable,
  uuid,
  numeric,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { payments } from "./index.js";
import { refundStatusEnum } from "./enums.js";

export const refunds = pgTable("refunds", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id")
    .notNull()
    .references(() => payments.id, { onDelete: "cascade" }),

  stripeRefundId: varchar("stripe_refund_id", { length: 255 }),
  amount: numeric("amount").notNull(),
  reason: text("reason"),
  status: refundStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
