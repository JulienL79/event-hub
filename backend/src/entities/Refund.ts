import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { refunds } from "../schemas";

export type Refund = InferSelectModel<typeof refunds>;

export type NewRefund = InferInsertModel<typeof refunds>;
