import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Globe, Sun, Cloud, Calendar } from 'lucide-react';

const DestinationPage: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  
  // Convertir l'URL en nom de pays formaté
  const formattedCountry = decodeURIComponent(country || '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      {/* En-tête */}
      <section className="pt-24 pb-12 bg-blue-900 text-white">
        <div className="container-custom">
          <Link 
            to="/destinations" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux destinations
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Découvrez {formattedCountry}
          </h1>
          <div className="flex items-center text-blue-100">
            <MapPin size={20} className="mr-2" />
            <span>{formattedCountry}</span>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Informations générales */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="font-serif text-2xl font-bold mb-4">À propos de {formattedCountry}</h2>
                <p className="text-gray-600 mb-6">
                  Découvrez les merveilles de {formattedCountry}, une destination unique qui vous 
                  promet des expériences inoubliables. Des paysages à couper le souffle aux 
                  traditions culturelles riches, chaque voyage est une nouvelle aventure.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Globe size={20} className="text-blue-900 mr-2" />
                      <h3 className="font-medium">Région</h3>
                    </div>
                    <p className="text-gray-600">Information régionale</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calendar size={20} className="text-blue-900 mr-2" />
                      <h3 className="font-medium">Meilleure période</h3>
                    </div>
                    <p className="text-gray-600">Toute l'année</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Sun size={20} className="text-blue-900 mr-2" />
                      <h3 className="font-medium">Climat</h3>
                    </div>
                    <p className="text-gray-600">Information climatique</p>
                  </div>
                </div>
              </div>

              {/* Points d'intérêt */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-serif text-2xl font-bold mb-6">Points d'intérêt</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <MapPin size={24} className="text-blue-900" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Point d'intérêt {index + 1}</h3>
                        <p className="text-gray-600">
                          Description du point d'intérêt avec des détails sur ce qu'il y a à voir et à faire.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="font-serif text-xl font-bold mb-4">Planifiez votre voyage</h2>
                <div className="space-y-4">
                  <button className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300">
                    Voir nos voyages
                  </button>
                  <button className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-400 transition duration-300">
                    Contacter un expert
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Informations pratiques</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <Cloud size={18} className="mr-2 text-blue-900" />
                      <span>Météo et climat</span>
                    </li>
                    <li className="flex items-center">
                      <Globe size={18} className="mr-2 text-blue-900" />
                      <span>Visa et formalités</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar size={18} className="mr-2 text-blue-900" />
                      <span>Meilleure période</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationPage;