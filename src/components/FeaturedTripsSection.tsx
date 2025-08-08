import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import TripCard from './TripCard';
import { trips } from '../data/trips';

/**
 * Featured trips section component displaying the most popular trips
 */
const FeaturedTripsSection: React.FC = () => {
  // Get the first 3 trips as featured
  const featuredTrips = trips.slice(0, 3);

  return (
    <section className="bg-gray-50 dark:bg-gray-800 section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionTitle
            title="Voyages en Vedette"
            subtitle="Nos expériences de voyage les plus populaires et les mieux notées, parfaites pour votre prochaine aventure."
            underline
            className="mb-6 md:mb-0"
          />
          <Link to="/trips" className="flex items-center text-blue-900 dark:text-blue-400 font-medium hover:text-amber-500 dark:hover:text-amber-400 transition">
            Voir Toutes les Destinations
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTripsSection;