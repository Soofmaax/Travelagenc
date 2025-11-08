import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COUNTRIES_FR } from '../data/countries';
import { useDestinationSuggestions } from '../hooks/useDestinationSuggestions';
import { useTranslation } from 'react-i18next';
import FormError from './common/FormError';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const suggestions = useDestinationSuggestions(COUNTRIES_FR, searchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(suggestions.length > 0 && searchTerm.length > 0);
  }, [suggestions, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setError('');
  };

  const handleSuggestionClick = (country: string) => {
    setSearchTerm(country);
    setIsOpen(false);
    navigate(`/destination/${encodeURIComponent(country.toLowerCase())}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim() === '') {
      setError(t('search.errors.requiredCountry'));
      return;
    }

    const exactMatch = COUNTRIES_FR.find(country => country.toLowerCase() === searchTerm.toLowerCase());

    if (exactMatch) {
      onSearch(exactMatch);
      navigate(`/destination/${encodeURIComponent(exactMatch.toLowerCase())}`);
    } else {
      if (suggestions.length > 0) {
        setError(t('search.errors.suggestion', { suggestion: suggestions[0] }));
      } else {
        setError(t('search.errors.notFound'));
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setError('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative flex">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={t('search.placeholder')}
            className="w-full py-3 pl-12 pr-10 rounded-l-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-700"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-r-full transition duration-300 flex items-center"
        >
          {t('search.submit')}
        </button>
      </form>

      <div className="absolute w-full mt-2">
        <FormError message={error} className="w-full bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-md animate-fade-in" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute w-full bg-white mt-2 rounded-lg shadow-lg border border-gray-200 z-50">
          {suggestions.map((country, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(country)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200 first:rounded-t-lg last:rounded-b-lg"
            >
              {country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;