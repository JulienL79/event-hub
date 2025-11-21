"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureRelations =
  exports.refundRelations =
  exports.reviewRelations =
  exports.invoiceRelations =
  exports.paymentRelations =
  exports.ticketRelations =
  exports.bookingRelations =
  exports.ticketTypeRelations =
  exports.eventRelations =
  exports.locationRelations =
  exports.categoryPreferenceRelations =
  exports.categoryRelations =
  exports.userRelations =
  exports.roleRelations =
    void 0;
const drizzle_orm_1 = require("drizzle-orm");
const _1 = require("./");
exports.roleRelations = (0, drizzle_orm_1.relations)(_1.roles, ({ many }) => ({
  users: many(_1.users),
}));
exports.userRelations = (0, drizzle_orm_1.relations)(
  _1.users,
  ({ many, one }) => ({
    role: one(_1.roles, {
      fields: [_1.users.roleId],
      references: [_1.roles.id],
    }),
    bookings: many(_1.bookings),
    reviews: many(_1.reviews),
    categoryPreferences: many(_1.categoriesPreferences),
    eventsOrganized: many(_1.events, { relationName: "eventsOrganized" }),
  }),
);
exports.categoryRelations = (0, drizzle_orm_1.relations)(
  _1.categories,
  ({ many }) => ({
    events: many(_1.events),
    usersPrefered: many(_1.categoriesPreferences),
  }),
);
exports.categoryPreferenceRelations = (0, drizzle_orm_1.relations)(
  _1.categoriesPreferences,
  ({ one }) => ({
    user: one(_1.users, {
      fields: [_1.categoriesPreferences.userId],
      references: [_1.users.id],
    }),
    category: one(_1.categories, {
      fields: [_1.categoriesPreferences.categoryId],
      references: [_1.categories.id],
    }),
  }),
);
exports.locationRelations = (0, drizzle_orm_1.relations)(
  _1.locations,
  ({ many }) => ({
    events: many(_1.events),
    pictures: many(_1.pictures),
  }),
);
exports.eventRelations = (0, drizzle_orm_1.relations)(
  _1.events,
  ({ one, many }) => ({
    organizer: one(_1.users, {
      fields: [_1.events.organizerId],
      references: [_1.users.id],
    }),
    location: one(_1.locations, {
      fields: [_1.events.locationId],
      references: [_1.locations.id],
    }),
    category: one(_1.categories, {
      fields: [_1.events.categoryId],
      references: [_1.categories.id],
    }),
    ticketTypes: many(_1.ticketTypes),
    bookings: many(_1.bookings),
    reviews: many(_1.reviews),
    pictures: many(_1.pictures),
  }),
);
exports.ticketTypeRelations = (0, drizzle_orm_1.relations)(
  _1.ticketTypes,
  ({ one, many }) => ({
    event: one(_1.events, {
      fields: [_1.ticketTypes.eventId],
      references: [_1.events.id],
    }),
    tickets: many(_1.tickets),
  }),
);
exports.bookingRelations = (0, drizzle_orm_1.relations)(
  _1.bookings,
  ({ one, many }) => ({
    user: one(_1.users, {
      fields: [_1.bookings.userId],
      references: [_1.users.id],
    }),
    event: one(_1.events, {
      fields: [_1.bookings.eventId],
      references: [_1.events.id],
    }),
    tickets: many(_1.tickets),
    payments: many(_1.payments),
    invoices: many(_1.invoices),
  }),
);
exports.ticketRelations = (0, drizzle_orm_1.relations)(
  _1.tickets,
  ({ one }) => ({
    booking: one(_1.bookings, {
      fields: [_1.tickets.bookingId],
      references: [_1.bookings.id],
    }),
    ticketType: one(_1.ticketTypes, {
      fields: [_1.tickets.ticketTypeId],
      references: [_1.ticketTypes.id],
    }),
  }),
);
exports.paymentRelations = (0, drizzle_orm_1.relations)(
  _1.payments,
  ({ one, many }) => ({
    booking: one(_1.bookings, {
      fields: [_1.payments.bookingId],
      references: [_1.bookings.id],
    }),
    invoices: one(_1.invoices, {
      fields: [_1.payments.invoiceId],
      references: [_1.invoices.id],
    }),
    refunds: many(_1.refunds),
  }),
);
exports.invoiceRelations = (0, drizzle_orm_1.relations)(
  _1.invoices,
  ({ one, many }) => ({
    booking: one(_1.bookings, {
      fields: [_1.invoices.bookingId],
      references: [_1.bookings.id],
    }),
    payment: many(_1.payments),
  }),
);
exports.reviewRelations = (0, drizzle_orm_1.relations)(
  _1.reviews,
  ({ one }) => ({
    user: one(_1.users, {
      fields: [_1.reviews.userId],
      references: [_1.users.id],
    }),
    event: one(_1.events, {
      fields: [_1.reviews.eventId],
      references: [_1.events.id],
    }),
  }),
);
exports.refundRelations = (0, drizzle_orm_1.relations)(
  _1.refunds,
  ({ one }) => ({
    payment: one(_1.payments, {
      fields: [_1.refunds.paymentId],
      references: [_1.payments.id],
    }),
  }),
);
exports.pictureRelations = (0, drizzle_orm_1.relations)(
  _1.pictures,
  ({ one }) => ({
    event: one(_1.events, {
      fields: [_1.pictures.eventId],
      references: [_1.events.id],
    }),
    location: one(_1.locations, {
      fields: [_1.pictures.locationId],
      references: [_1.locations.id],
    }),
  }),
);
