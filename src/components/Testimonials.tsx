import React from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Londres, Royaume-Uni",
      trip: "Escapade à Santorin",
      image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg",
      rating: 5,
      text: "Mon voyage à Santorin a dépassé toutes mes attentes. Les couchers de soleil étaient magiques, et l'équipe de VoyageExplore a rendu tout le séjour parfait du début à la fin."
    },
    {
      name: "David Chen",
      location: "Toronto, Canada",
      trip: "Expérience Culturelle à Kyoto",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5,
      text: "L'attention aux détails lors de notre voyage à Kyoto était impressionnante. Nous avons découvert le Japon authentique d'une manière qui aurait été impossible seuls."
    },
    {
      name: "Maria Gonzalez",
      location: "Barcelone, Espagne",
      trip: "Évasion sur la Côte Amalfitaine",
      image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
      rating: 4,
      text: "La Côte Amalfitaine est maintenant mon endroit préféré au monde ! Notre guide Paolo était compétent et sympathique, rendant chaque journée unique."
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-800 section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4">Ce Que Disent Nos Voyageurs</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Témoignages authentiques de voyageurs qui ont vécu l'expérience VoyageExplore lors de leurs périples à travers le monde.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              trip={testimonial.trip}
              image={testimonial.image}
              rating={testimonial.rating}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;