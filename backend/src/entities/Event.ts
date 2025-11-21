import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { events } from "../schemas/index.js";

export type Event = InferSelectModel<typeof events>;

export type NewEvent = InferInsertModel<typeof events>;
