import { pgTable, uuid, varchar, integer, text } from "drizzle-orm/pg-core";

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  addressStreet: varchar("address_street", { length: 255 }).notNull(),
  addressCity: varchar("address_city", { length: 255 }).notNull(),
  addressZip: varchar("address_zip", { length: 5 }).notNull(),
  addressCountry: varchar("address_country", { length: 255 }).notNull(),
  coordLat: varchar("coord_lat", { length: 255 }).notNull(),
  coordLon: varchar("coord_lon", { length: 255 }).notNull(),
  equipments: text("equipments").notNull(),
  capacity: integer("capacity").notNull(),
});
