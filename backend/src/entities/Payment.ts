import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { payments } from "../schemas";

export type Payment = InferSelectModel<typeof payments>;

export type NewPayment = InferInsertModel<typeof payments>;
