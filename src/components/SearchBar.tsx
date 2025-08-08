import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", 
  "Angola", "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", 
  "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", 
  "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", 
  "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", 
  "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", 
  "Chine", "Chypre", "Colombie", "Comores", "Congo", "Corée du Nord", "Corée du Sud", 
  "Costa Rica", "Côte d'Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", 
  "République dominicaine", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", 
  "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", 
  "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", 
  "Guinée", "Guinée équatoriale", "Guinée-Bissau", "Guyana", "Haïti", "Honduras", 
  "Hongrie", "Îles Marshall", "Îles Salomon", "Inde", "Indonésie", "Irak", "Iran", 
  "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", 
  "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït", "Laos", "Lesotho", 
  "Lettonie", "Liban", "Libéria", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", 
  "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", 
  "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", 
  "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", 
  "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", 
  "Ouzbékistan", "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", 
  "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal", "Qatar", 
  "République centrafricaine", "République démocratique du Congo", "République tchèque", 
  "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Kitts-et-Nevis", "Saint-Marin", 
  "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salvador", "Samoa", "São Tomé-et-Principe", 
  "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", 
  "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", 
  "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tonga", 
  "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", 
  "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
];

const fuse = new Fuse(countries, {
  includeScore: true,
  threshold: 0.3,
  minMatchCharLength: 1,
  keys: ["title"]
});

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

    if (value.length > 0) {
      const results = fuse.search(value).map(result => result.item);
      setSuggestions(results.slice(0, 5));
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (country: string) => {
    setSearchTerm(country);
    setSuggestions([]);
    setIsOpen(false);
    navigate(`/destination/${encodeURIComponent(country.toLowerCase())}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') {
      setError('Veuillez entrer un pays');
      return;
    }

    const exactMatch = countries.find(
      country => country.toLowerCase() === searchTerm.toLowerCase()
    );

    if (exactMatch) {
      onSearch(exactMatch);
      navigate(`/destination/${encodeURIComponent(exactMatch.toLowerCase())}`);
    } else {
      const suggestions = fuse.search(searchTerm).map(result => result.item);
      if (suggestions.length > 0) {
        setError(`Pays non trouvé. Vouliez-vous dire : ${suggestions[0]} ?`);
      } else {
        setError('Pays non trouvé. Veuillez vérifier l\'orthographe.');
      }
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
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
            placeholder="Rechercher une destination..."
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
          Rechercher
        </button>
      </form>

      {error && (
        <div className="absolute w-full bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-md mt-2 animate-fade-in">
          {error}
        </div>
      )}

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