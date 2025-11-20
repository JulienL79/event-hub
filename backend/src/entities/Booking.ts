import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { bookings } from "../schemas";

export type Booking = InferSelectModel<typeof bookings>;

export type NewBooking = InferInsertModel<typeof bookings>;
