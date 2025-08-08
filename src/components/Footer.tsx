import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-6">VoyageExplore</h3>
            <p className="text-blue-100 dark:text-gray-300 mb-6">
              Découvrez le monde avec VoyageExplore, votre compagnon de voyage premium
              depuis 2025. Nous créons des voyages inoubliables adaptés à vos rêves.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/voyageexplore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 dark:hover:text-amber-300 transition"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/voyageexplore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 dark:hover:text-amber-300 transition"
                aria-label="Suivez-nous sur Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com/voyageexplore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-amber-400 dark:hover:text-amber-300 transition"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Réserver un Voyage
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Destinations Populaires</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/destination/grece" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Santorin, Grèce
                </Link>
              </li>
              <li>
                <Link to="/destination/japon" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Kyoto, Japon
                </Link>
              </li>
              <li>
                <Link to="/destination/perou" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Machu Picchu, Pérou
                </Link>
              </li>
              <li>
                <Link to="/destination/indonesie" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Bali, Indonésie
                </Link>
              </li>
              <li>
                <Link to="/destination/italie" className="text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition">
                  Côte Amalfitaine, Italie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contactez-nous</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <span className="text-blue-100 dark:text-gray-300">123 Travel Boulevard, Paris, France</span>
              </li>
              <li>
                <a 
                  href="tel:+33123456789" 
                  className="flex items-center space-x-3 text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition"
                >
                  <Phone className="flex-shrink-0" size={18} />
                  <span>+33 (0)1 23 45 67 89</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@voyageexplore.com" 
                  className="flex items-center space-x-3 text-blue-100 dark:text-gray-300 hover:text-amber-400 dark:hover:text-amber-300 transition"
                >
                  <Mail className="flex-shrink-0" size={18} />
                  <span>info@voyageexplore.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 dark:border-gray-700 mt-12 pt-8 text-center text-blue-200 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} VoyageExplore. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;