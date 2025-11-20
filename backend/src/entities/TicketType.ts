import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { ticketTypes } from "../schemas";

export type TicketType = InferSelectModel<typeof ticketTypes>;

export type NewTicketType = InferInsertModel<typeof ticketTypes>;
