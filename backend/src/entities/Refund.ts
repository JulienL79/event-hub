import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { refunds } from "../schemas/index.js";

export type Refund = InferSelectModel<typeof refunds>;

export type NewRefund = InferInsertModel<typeof refunds>;
