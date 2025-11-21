import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { reviews } from "../schemas/index.js";

export type Review = InferSelectModel<typeof reviews>;

export type NewReview = InferInsertModel<typeof reviews>;
