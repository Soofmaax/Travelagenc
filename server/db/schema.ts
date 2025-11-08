import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Trips table (aligned with front-end data model)
export const trips = sqliteTable('trips', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  destination: text('destination').notNull(),
  description: text('description').notNull(),
  longDescription: text('long_description').notNull(),
  image: text('image').notNull(),
  // Store gallery as JSON string to keep SQLite simple (free option)
  galleryJson: text('gallery_json').notNull(), // JSON.stringify(string[])
  price: real('price').notNull(),
  duration: integer('duration').notNull(),
  rating: real('rating').notNull(),
  reviews: integer('reviews').notNull(),
  highlightsJson: text('highlights_json').notNull(), // JSON.stringify(string[])
  includedJson: text('included_json').notNull(), // JSON.stringify(string[])
  itineraryJson: text('itinerary_json').notNull(), // JSON.stringify({day,title,description}[])
  departureDateJson: text('departure_date_json').notNull(), // JSON.stringify(string[])
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
});

// Bookings table (baseline)
export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey(),
  tripId: integer('trip_id').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  passengers: integer('passengers').notNull(),
  departureDate: text('departure_date').notNull(),
  specialRequests: text('special_requests'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`)
});