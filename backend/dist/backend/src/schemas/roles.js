"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const enums_1 = require("./enums");
exports.roles = (0, pg_core_1.pgTable)("roles", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  name: (0, enums_1.roleEnum)("name").notNull(),
});
