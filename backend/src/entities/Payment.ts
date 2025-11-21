import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { payments } from "../schemas/index.js";

export type Payment = InferSelectModel<typeof payments>;

export type NewPayment = InferInsertModel<typeof payments>;
