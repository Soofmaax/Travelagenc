import React, { useMemo, useState } from 'react';
import { CalendarRange, Minus, Plus, UserRound, Wallet } from 'lucide-react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import type { Currency, SearchParams, TravelClass } from '../types';
import { currencies } from '../utils/currency';

const countries = [
  'France',
  'Espagne',
  'Italie',
  'Portugal',
  'Royaume-Uni',
  'États-Unis',
  'Canada',
  'Japon',
  'Thaïlande',
  'Maroc',
];

const fuse = new Fuse(countries, {
  includeScore: true,
  threshold: 0.3,
  minMatchCharLength: 1,
});

interface BookingSearchBarProps {
  onDestinationSearch?: (destination: string) => void;
  onSearchParams?: (params: SearchParams) => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const BookingSearchBar: React.FC<BookingSearchBarProps> = ({ onDestinationSearch, onSearchParams }) => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 });
  const [travelClass, setTravelClass] = useState<TravelClass>('economy');
  const [currency, setCurrency] = useState<Currency>('EUR');

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState('');

  const isValidRange = useMemo(() => {
    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  }, [startDate, endDate]);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    setError('');
    if (value.length > 0) {
      const results = fuse.search(value).map(r => r.item);
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError('Veuillez indiquer une destination');
      return;
    }
    if (!isValidRange) {
      setError('La date de retour doit être postérieure à la date de départ');
      return;
    }

    const params: SearchParams = {
      destination,
      startDate,
      endDate,
      travelers,
      travelClass,
      currency,
    };

    // Callbacks pour intégration actuelle
    onDestinationSearch?.(destination);
    onSearchParams?.(params);

    navigate(`/destination/${encodeURIComponent(destination.toLowerCase())}`);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        {/* Destination */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={e => handleDestinationChange(e.target.value)}
            placeholder="Où souhaitez-vous partir ?"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            list="destinations"
          />
          {suggestions.length > 0 && (
            <datalist id="destinations">
              {suggestions.map(s => (
                <option key={s} value={s} />
              ))}
            </datalist>
          )}
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Aller</label>
          <div className="relative">
            <CalendarRange size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="date"
              value={startDate ?? ''}
              onChange={e => setStartDate(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Retour</label>
          <div className="relative">
            <CalendarRange size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="date"
              value={endDate ?? ''}
              min={startDate ?? undefined}
              onChange={e => setEndDate(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          {!isValidRange && <p className="text-xs text-red-600 mt-1">La date de retour doit être après le départ.</p>}
        </div>

        {/* Voyageurs / Classe */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Voyageurs</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <UserRound size={16} className="text-gray-600" />
              <button type="button" className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setTravelers(t => ({ ...t, adults: clamp(t.adults - 1, 1, 9) }))}>
                <Minus size={14} />
              </button>
              <span className="w-6 text-center">{travelers.adults}</span>
              <button type="button" className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setTravelers(t => ({ ...t, adults: clamp(t.adults + 1, 1, 9) }))}>
                <Plus size={14} />
              </button>
              <span className="text-xs text-gray-600 ml-1">Adultes</span>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setTravelers(t => ({ ...t, children: clamp(t.children - 1, 0, 9) }))}>
                <Minus size={14} />
              </button>
              <span className="w-6 text-center">{travelers.children}</span>
              <button type="button" className="p-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setTravelers(t => ({ ...t, children: clamp(t.children + 1, 0, 9) }))}>
                <Plus size={14} />
              </button>
              <span className="text-xs text-gray-600 ml-1">Enfants</span>
            </div>
          </div>
          <div className="mt-2">
            <select
              value={travelClass}
              onChange={e => setTravelClass(e.target.value as TravelClass)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="economy">Économie</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
              <option value="first">Première</option>
            </select>
          </div>
        </div>

        {/* Devise */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Devise</label>
          <div className="relative">
            <Wallet size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value as Currency)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-5">
          {error && <div className="mb-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</div>}
          <button type="submit" className="btn-primary w-full">Rechercher</button>
        </div>
      </div>
    </form>
  );
};

export default BookingSearchBar;