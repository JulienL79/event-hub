import { pgEnum } from "drizzle-orm/pg-core";

// Enum pour le rôle des utilisateurs
export const roleEnum = pgEnum("role_enum", [
  "participant",
  "organizer",
  "admin",
]);

// Enum pour le statut des événements
export const eventStatusEnum = pgEnum("event_status_enum", [
  "draft",
  "published",
  "cancelled",
]);

// Enum pour le statut des réservations
export const bookingStatusEnum = pgEnum("booking_status_enum", [
  "pending",
  "paid",
  "cancelled",
  "refunded",
]);

// Enum pour le statut des tickets
export const ticketStatusEnum = pgEnum("ticket_status_enum", [
  "valid",
  "used",
  "cancelled",
]);

// Enum pour le statut des paiements
export const paymentStatusEnum = pgEnum("payment_status_enum", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);

// Enum pour le statut des factures
export const invoiceStatusEnum = pgEnum("invoice_status_enum", [
  "issued",
  "paid",
  "cancelled",
  "refunded",
  "pending",
]);

// Enum pour le statut des remboursements
export const refundStatusEnum = pgEnum("refund_status_enum", [
  "pending",
  "completed",
  "failed",
]);
