import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  trip: string;
  image: string;
  rating: number;
  text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  trip,
  image,
  rating,
  text
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/20 p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-gray-600"}
          />
        ))}
      </div>
      <p className="text-blue-900 dark:text-blue-400 font-medium mb-3">{trip}</p>
      <p className="text-gray-700 dark:text-gray-300 italic flex-grow">{text}</p>
    </div>
  );
};

export default TestimonialCard;