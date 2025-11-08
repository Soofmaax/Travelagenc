import { z } from 'zod';

export const TripSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().min(1),
  destination: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  image: z.string().url().or(z.string().min(1)), // allow placeholder URLs
  gallery: z.array(z.string().min(1)),
  price: z.number().nonnegative(),
  duration: z.number().int().positive(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  highlights: z.array(z.string().min(1)),
  included: z.array(z.string().min(1)),
  itinerary: z.array(
    z.object({
      day: z.number().int().positive(),
      title: z.string().min(1),
      description: z.string().min(1),
    })
  ),
  departureDate: z.array(z.string().min(1)), // ISO date strings expected
});

export type TripDTO = z.infer<typeof TripSchema>;

export const BookingFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email is invalid'),
  phone: z.string().min(5, 'Phone is required'),
  passengers: z.coerce.number().int().min(1, 'At least 1 passenger'),
  departureDate: z.string().min(1, 'Please select a departure date'),
  specialRequests: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
    path: ['agreeTerms'],
  }),
});

export type BookingFormDTO = z.infer<typeof BookingFormSchema>;