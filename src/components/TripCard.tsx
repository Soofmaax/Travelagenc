import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star } from 'lucide-react';
import { Trip } from '../data/trips';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <div className="card destination-card group bg-white dark:bg-gray-800 shadow-md hover:shadow-xl dark:shadow-gray-900/20">
      <div className="relative overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-1 text-amber-400">
            <Star size={16} fill="#F59E0B" />
            <span className="font-medium">{trip.rating.toFixed(1)}</span>
            <span className="text-sm text-gray-200 dark:text-gray-300">({trip.reviews} avis)</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold mb-2 text-gray-900 dark:text-white">{trip.title}</h3>
        <div className="flex items-center mb-3 text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-1" />
          <span>{trip.destination}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{trip.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Calendar size={16} className="mr-1" />
            <span>{trip.duration} jours</span>
          </div>
          <div className="text-blue-900 dark:text-blue-400 font-bold">
            €{trip.price}
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">/personne</span>
          </div>
        </div>
        <div className="mt-5">
          <Link 
            to={`/trips/${trip.id}`} 
            className="block text-center btn-primary"
          >
            Explorer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;