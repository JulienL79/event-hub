import { pgTable, uuid } from "drizzle-orm/pg-core";
import { users, categories } from "./index.js";

export const categoriesPreferences = pgTable("categories_preferences", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});
