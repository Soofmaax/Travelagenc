import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedTripsSection from '../components/FeaturedTripsSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

/**
 * HomePage component - Main landing page of the application
 * Displays hero section, features, featured trips, testimonials, and newsletter signup
 */
const HomePage: React.FC = () => {
  const handleSearch = (term: string) => {
    console.log('Search term:', term);
    // Search functionality will be implemented later
  };

  return (
    <div>
      <HeroSection
        title="Découvrez les Plus Beaux Endroits du Monde"
        subtitle="Des expériences de voyage inoubliables créées par des experts pour les voyageurs les plus exigeants"
        backgroundImage="hero-background"
        showSearchBar={true}
        primaryButtonText="Explorer les Destinations"
        primaryButtonLink="/trips"
        secondaryButtonText="Réserver un Voyage"
        secondaryButtonLink="/booking"
        onSearch={handleSearch}
      />
      
      <FeaturesSection />
      <FeaturedTripsSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;