import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { locations } from "../schemas/index.js";

export type Location = InferSelectModel<typeof locations>;

export type NewLocation = InferInsertModel<typeof locations>;
