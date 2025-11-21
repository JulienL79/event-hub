import { faker } from "@faker-js/faker";
import { db, pool } from "../src/config//index.js"; // Drizzle instance + pool
import * as schema from "../src/schemas/index.js";
import type {
  NewBooking,
  NewCategoriesPreference,
  NewCategory,
  NewEvent,
  NewInvoice,
  NewLocation,
  NewPayment,
  NewReview,
  NewRole,
  NewTicket,
  NewTicketType,
  NewUser,
} from "../src/entities";
import { eq } from "drizzle-orm";
import { logger } from "../src/utils";

async function seedRoles() {
  logger.info("➤ Seeding roles...");
  const roles = ["participant", "organizer", "admin"];
  const roleIds: Record<string, string> = {};

  for (const name of roles) {
    const res = await db
      .insert(schema.roles)
      .values({ name } as NewRole)
      .returning({ id: schema.roles.id });
    roleIds[name] = res[0].id;
  }

  return roleIds;
}

async function seedUsers(roleIds: Record<string, string>, length: number) {
  logger.info("➤ Seeding users...");
  const userIds: string[] = [];

  for (let i = 0; i < length; i++) {
    const res = await db
      .insert(schema.users)
      .values({
        roleId: faker.helpers.arrayElement(Object.values(roleIds)),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        birthdate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number().slice(0, 20),
        password: faker.internet.password(),
        addressStreet: faker.location.streetAddress(),
        addressCity: faker.location.city(),
        addressZip: faker.location.zipCode().slice(0, 5),
        addressCountry: faker.location.country(),
        coordLat: faker.location.latitude().toString(),
        coordLon: faker.location.longitude().toString(),
        isEmail: true,
        isSms: true,
        isInApp: true,
        language: "fr",
        theme: "light",
        tempTokenId: faker.string.uuid(),
      } as NewUser)
      .returning({ id: schema.users.id });

    userIds.push(res[0].id);
  }

  return userIds;
}

async function seedCategories() {
  logger.info("➤ Seeding categories...");
  const categoryIds: string[] = [];
  const categories = ["Tech", "Art", "Sport", "Music", "Food"];

  for (const name of categories) {
    const res = await db
      .insert(schema.categories)
      .values({ name, description: faker.lorem.sentence() } as NewCategory)
      .returning({ id: schema.categories.id });

    categoryIds.push(res[0].id);
  }

  return categoryIds;
}

async function seedLocations(length: number) {
  logger.info("➤ Seeding locations...");
  const locationIds: string[] = [];

  for (let i = 0; i < length; i++) {
    const res = await db
      .insert(schema.locations)
      .values({
        name: faker.company.name(),
        addressStreet: faker.location.streetAddress(),
        addressCity: faker.location.city(),
        addressZip: faker.location.zipCode().slice(0, 5),
        addressCountry: faker.location.country(),
        coordLat: faker.location.latitude().toString(),
        coordLon: faker.location.longitude().toString(),
        capacity: faker.number.int({ min: 50, max: 500 }),
        equipments: faker.lorem.words(5),
      } as NewLocation)
      .returning({ id: schema.locations.id });

    locationIds.push(res[0].id);
  }

  return locationIds;
}

async function seedEvents(
  users: string[],
  locations: string[],
  categories: string[],
  length: number,
) {
  logger.info("➤ Seeding events...");
  const eventIds: string[] = [];

  for (let i = 0; i < length; i++) {
    const start = faker.date.soon();
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const res = await db
      .insert(schema.events)
      .values({
        organizerId: faker.helpers.arrayElement(users),
        locationId: faker.helpers.arrayElement(locations),
        categoryId: faker.helpers.arrayElement(categories),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        dateStart: start,
        dateEnd: end,
        capacity: faker.number.int({ min: 50, max: 300 }),
        priceMin: faker.number.float({ min: 0, max: 30 }).toFixed(2),
        status: "published",
      } as NewEvent)
      .returning({ id: schema.events.id });

    eventIds.push(res[0].id);
  }

  return eventIds;
}

async function seedTicketTypes(events: string[]) {
  logger.info("➤ Seeding ticket types...");
  const ticketTypeIds: string[] = [];

  for (const eventId of events) {
    for (const type of ["Standard", "VIP"]) {
      const res = await db
        .insert(schema.ticketTypes)
        .values({
          eventId,
          name: type,
          price: faker.number.float({ min: 5, max: 100 }).toFixed(2),
          quota: faker.number.int({ min: 20, max: 200 }),
        } as NewTicketType)
        .returning({ id: schema.ticketTypes.id });

      ticketTypeIds.push(res[0].id);
    }
  }

  return ticketTypeIds;
}

async function seedBookings(
  users: string[],
  events: string[],
  ticketTypes: string[],
  length: number,
) {
  logger.info("➤ Seeding bookings, tickets, payments, invoices...");

  for (let i = 0; i < length; i++) {
    const userId = faker.helpers.arrayElement(users);
    const eventId = faker.helpers.arrayElement(events);

    const bookingRes = await db
      .insert(schema.bookings)
      .values({
        userId,
        eventId,
        status: "paid",
        total_amount: faker.number.float({ min: 10, max: 200 }).toFixed(2),
      } as NewBooking)
      .returning({ id: schema.bookings.id });

    const bookingId = bookingRes[0].id;

    const ticketTypeId = faker.helpers.arrayElement(ticketTypes);

    await db.insert(schema.tickets).values({
      bookingId,
      ticketTypeId,
      price: faker.number.float({ min: 10, max: 200 }).toFixed(2),
    } as NewTicket);

    const paymentRes = await db
      .insert(schema.payments)
      .values({
        bookingId,
        amount: faker.number.float({ min: 10, max: 200 }).toFixed(2),
        status: "succeeded",
      } as NewPayment)
      .returning({ id: schema.payments.id });

    const invoiceRes = await db
      .insert(schema.invoices)
      .values({
        bookingId,
        invoice_number: faker.string.uuid(),
        total_amount: faker.number.float({ min: 10, max: 200 }).toFixed(2),
        billingName: faker.person.fullName(),
        billingEmail: faker.internet.email(),
        billingAddressStreet: faker.location.streetAddress(),
        billingAddressCity: faker.location.city(),
        billingAddressZip: faker.location.zipCode().slice(0, 5),
        billingAddressCountry: faker.location.country(),
        event_title: faker.lorem.words(3),
        event_start_date: faker.date.past(),
        event_end_date: faker.date.recent(),
        organizerName: faker.person.fullName(),
      } as NewInvoice)
      .returning({ id: schema.invoices.id });

    const invoiceId = invoiceRes[0].id;
    const paymentId = paymentRes[0].id;

    await db
      .update(schema.payments)
      .set({ invoiceId })
      .where(eq(schema.payments.id, paymentId));
  }
}

async function seedReviews(users: string[], events: string[], length: number) {
  logger.info("➤ Seeding reviews...");
  for (let i = 0; i < length; i++) {
    await db.insert(schema.reviews).values({
      userId: faker.helpers.arrayElement(users),
      eventId: faker.helpers.arrayElement(events),
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
    } as NewReview);
  }
}

async function seedCategoriesPreferences(
  users: string[],
  categories: string[],
) {
  logger.info("➤ Seeding categories preferences...");
  for (const userId of users) {
    const shuffled = faker.helpers.arrayElements(
      categories,
      faker.number.int({ min: 1, max: categories.length }),
    );
    for (const categoryId of shuffled) {
      await db
        .insert(schema.categoriesPreferences)
        .values({ userId, categoryId } as NewCategoriesPreference);
    }
  }
}

async function main() {
  logger.info("🌱 Starting seeding...");

  try {
    const roleIds = await seedRoles();
    const users = await seedUsers(roleIds, 20);
    const categories = await seedCategories();
    const locations = await seedLocations(20);
    const events = await seedEvents(users, locations, categories, 20);
    const ticketTypes = await seedTicketTypes(events);

    await seedBookings(users, events, ticketTypes, 20);
    await seedReviews(users, events, 20);
    await seedCategoriesPreferences(users, categories);

    logger.info("✅ Seeding complete!");
  } catch (err) {
    logger.error("❌ Seeding failed:", err);
  } finally {
    await pool.end();
  }
}

main();
