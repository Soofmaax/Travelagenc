import Fastify from 'fastify';
import { db } from './db/client';
import { trips } from './db/schema';
import { eq } from 'drizzle-orm';

const app = Fastify({
  logger: true,
});

app.get('/api/health', async () => ({ status: 'ok' }));

// List all trips (basic demo endpoint)
app.get('/api/trips', async () => {
  // Return minimal fields to keep payload small
  const rows = db.select({
    id: trips.id,
    title: trips.title,
    destination: trips.destination,
    price: trips.price,
    duration: trips.duration,
    rating: trips.rating,
    reviews: trips.reviews,
    image: trips.image,
  }).from(trips).all();

  return { trips: rows };
});

// Get a single trip
app.get('/api/trips/:id', async (req) => {
  const id = Number((req.params as { id: string }).id);
  const row = db.select().from(trips).where(eq(trips.id, id)).get();
  if (!row) return { trip: null };

  // Expand JSON fields (stored as JSON strings for SQLite)
  const trip = {
    ...row,
    gallery: JSON.parse(row.galleryJson),
    highlights: JSON.parse(row.highlightsJson),
    included: JSON.parse(row.includedJson),
    itinerary: JSON.parse(row.itineraryJson),
    departureDate: JSON.parse(row.departureDateJson),
  };

  // Remove internal JSON columns
  // @ts-expect-error strip internal props for response
  delete trip.galleryJson;
  // @ts-expect-error strip internal props for response
  delete trip.highlightsJson;
  // @ts-expect-error strip internal props for response
  delete trip.includedJson;
  // @ts-expect-error strip internal props for response
  delete trip.itineraryJson;
  // @ts-expect-error strip internal props for response
  delete trip.departureDateJson;

  return { trip };
});

async function start() {
  await app.listen({ port: 3001 });
  app.log.info('Server listening on http://localhost:3001');
}

void start();