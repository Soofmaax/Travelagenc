import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Composant qui gère le défilement automatique vers le haut lors des changements de route
 * 
 * @component
 * @example
 * ```tsx
 * <Router>
 *   <ScrollToTop />
 *   <Routes>
 *     // ... routes
 *   </Routes>
 * </Router>
 * ```
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      // Vérification de la prise en charge du comportement smooth
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback pour les navigateurs ne supportant pas le scroll smooth
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Erreur lors du défilement:', error);
      // Fallback en cas d'erreur - encapsulé pour éviter de relancer une exception
      try {
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        console.error('Fallback scroll failed:', fallbackError);
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;