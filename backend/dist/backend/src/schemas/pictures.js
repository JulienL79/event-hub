"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictures = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.pictures = (0, pg_core_1.pgTable)("pictures", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  eventId: (0, pg_core_1.uuid)("events_id").references(() => _1.events.id, {
    onDelete: "cascade",
  }),
  locationId: (0, pg_core_1.uuid)("locations_id").references(
    () => _1.locations.id,
    {
      onDelete: "cascade",
    },
  ),
  src: (0, pg_core_1.varchar)("src", { length: 255 }).notNull(),
});
