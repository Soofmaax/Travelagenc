import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  showSearchBar?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  onSearch?: (term: string) => void;
}

/**
 * Reusable hero section component with customizable content and actions
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  showSearchBar = false,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  onSearch
}) => {
  const sectionClass = backgroundImage 
    ? 'hero-section flex items-center justify-center text-white'
    : 'relative py-24 bg-blue-900 text-white';

  return (
    <section className={sectionClass}>
      <div className="container-custom text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-100">
          {subtitle}
        </p>
        
        {showSearchBar && onSearch && (
          <div className="flex justify-center mb-12">
            <SearchBar onSearch={onSearch} />
          </div>
        )}
        
        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex flex-wrap justify-center gap-4">
            {primaryButtonText && primaryButtonLink && (
              <Link to={primaryButtonLink} className="btn-primary">
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link to={secondaryButtonLink} className="btn-secondary">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;