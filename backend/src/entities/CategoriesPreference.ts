import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { categoriesPreferences } from "../schemas/index.js";

export type CategoriesPreference = InferSelectModel<
  typeof categoriesPreferences
>;

export type NewCategoriesPreference = InferInsertModel<
  typeof categoriesPreferences
>;
