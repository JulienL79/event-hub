import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { ticketTypes } from "../schemas/index.js";

export type TicketType = InferSelectModel<typeof ticketTypes>;

export type NewTicketType = InferInsertModel<typeof ticketTypes>;
