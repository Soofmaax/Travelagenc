import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="bg-blue-900 dark:bg-gray-900 text-white py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Rejoignez Notre Communauté de Voyageurs</h2>
          <p className="text-blue-100 dark:text-gray-300 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir des conseils de voyage exclusifs, des inspirations de destinations et des offres spéciales.
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="w-full py-3 px-4 pr-12 rounded-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-amber-500 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500 text-white p-2 rounded-full transition duration-300"
              aria-label="S'abonner"
            >
              <Send size={18} />
            </button>
          </form>
          
          {subscribed && (
            <p className="mt-4 text-green-300 dark:text-green-400 animate-pulse">
              Merci de votre inscription ! Bienvenue dans notre communauté de voyageurs.
            </p>
          )}
          
          <p className="mt-6 text-sm text-blue-200 dark:text-gray-400">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;