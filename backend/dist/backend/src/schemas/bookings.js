"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookings = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.bookings = (0, pg_core_1.pgTable)("bookings", {
  id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
  userId: (0, pg_core_1.uuid)("user_id")
    .notNull()
    .references(() => _1.users.id, { onDelete: "cascade" }),
  eventId: (0, pg_core_1.uuid)("event_id")
    .notNull()
    .references(() => _1.events.id, { onDelete: "cascade" }),
  status: (0, enums_1.bookingStatusEnum)("status").notNull().default("pending"),
  total_amount: (0, pg_core_1.numeric)("total_amount").notNull(),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
