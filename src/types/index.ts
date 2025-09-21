export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type Currency = 'EUR' | 'USD' | 'GBP';
export type TravelClass = 'economy' | 'premium' | 'business' | 'first';

export interface Travelers {
  adults: number;
  children: number;
}

export interface SearchParams {
  destination: string;
  startDate: string | null; // ISO yyyy-mm-dd
  endDate: string | null;   // ISO yyyy-mm-dd
  travelers: Travelers;
  travelClass: TravelClass;
  currency: Currency;
}