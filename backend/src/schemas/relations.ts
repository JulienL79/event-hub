import { relations } from "drizzle-orm";
import {
  users,
  roles,
  categories,
  categoriesPreferences,
  locations,
  events,
  ticketTypes,
  bookings,
  tickets,
  payments,
  invoices,
  reviews,
  refunds,
  pictures,
} from "./";

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const userRelations = relations(users, ({ many, one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  bookings: many(bookings),
  reviews: many(reviews),
  categoryPreferences: many(categoriesPreferences),
  eventsOrganized: many(events, { relationName: "eventsOrganized" }),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  events: many(events),
  usersPrefered: many(categoriesPreferences),
}));

export const categoryPreferenceRelations = relations(
  categoriesPreferences,
  ({ one }) => ({
    user: one(users, {
      fields: [categoriesPreferences.userId],
      references: [users.id],
    }),
    category: one(categories, {
      fields: [categoriesPreferences.categoryId],
      references: [categories.id],
    }),
  }),
);

export const locationRelations = relations(locations, ({ many }) => ({
  events: many(events),
  pictures: many(pictures),
}));

export const eventRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  location: one(locations, {
    fields: [events.locationId],
    references: [locations.id],
  }),
  category: one(categories, {
    fields: [events.categoryId],
    references: [categories.id],
  }),
  ticketTypes: many(ticketTypes),
  bookings: many(bookings),
  reviews: many(reviews),
  pictures: many(pictures),
}));

export const ticketTypeRelations = relations(ticketTypes, ({ one, many }) => ({
  event: one(events, {
    fields: [ticketTypes.eventId],
    references: [events.id],
  }),
  tickets: many(tickets),
}));

export const bookingRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [bookings.eventId],
    references: [events.id],
  }),
  tickets: many(tickets),
  payments: many(payments),
  invoices: many(invoices),
}));

export const ticketRelations = relations(tickets, ({ one }) => ({
  booking: one(bookings, {
    fields: [tickets.bookingId],
    references: [bookings.id],
  }),
  ticketType: one(ticketTypes, {
    fields: [tickets.ticketTypeId],
    references: [ticketTypes.id],
  }),
}));

export const paymentRelations = relations(payments, ({ one, many }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
  invoices: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
  refunds: many(refunds),
}));

export const invoiceRelations = relations(invoices, ({ one, many }) => ({
  booking: one(bookings, {
    fields: [invoices.bookingId],
    references: [bookings.id],
  }),
  payment: many(payments),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  event: one(events, {
    fields: [reviews.eventId],
    references: [events.id],
  }),
}));

export const refundRelations = relations(refunds, ({ one }) => ({
  payment: one(payments, {
    fields: [refunds.paymentId],
    references: [payments.id],
  }),
}));

export const pictureRelations = relations(pictures, ({ one }) => ({
  event: one(events, {
    fields: [pictures.eventId],
    references: [events.id],
  }),
  location: one(locations, {
    fields: [pictures.locationId],
    references: [locations.id],
  }),
}));
