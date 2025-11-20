import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { locations } from "../schemas";

export type Location = InferSelectModel<typeof locations>;

export type NewLocation = InferInsertModel<typeof locations>;
