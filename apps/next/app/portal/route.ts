import { CustomerPortal } from '@polar-sh/nextjs';

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req) => {
    // TODO: map your logged-in user to a Polar Customer ID
    // For demo purposes return empty to show login prompt in portal
    return '';
  },
  returnUrl: process.env.RETURN_URL || '/',
  server: 'sandbox',
});