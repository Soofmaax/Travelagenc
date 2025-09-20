import type { LucideIcon } from 'lucide-react';
import { Compass, CreditCard, Map, Shield, Users } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Features data for the "Why Choose VoyageExplore" section
 */
export const features: Feature[] = [
  {
    icon: Compass,
    title: 'Expertise Reconnue',
    description:
      'Nos destinations et itinéraires sont soigneusement sélectionnés et conçus par des experts du voyage avec une connaissance locale approfondie.',
  },
  {
    icon: Users,
    title: 'Petits Groupes',
    description:
      'Voyagez en groupes restreints pour une expérience plus personnalisée et des connexions authentiques.',
  },
  {
    icon: Shield,
    title: 'Tranquillité d\\'Esprit',
    description:
      'Assistance 24/7, assurance voyage complète et options de réservation flexibles pour voyager sans souci.',
  },
  {
    icon: Map,
    title: 'Expériences Uniques',
    description:
      'Accédez à des activités exclusives et des lieux secrets qui dépassent les attractions touristiques habituelles.',
  },
  {
    icon: CreditCard,
    title: 'Prix Transparents',
    description:
      'Tarification tout compris sans frais cachés, pour que vous sachiez exactement ce que vous payez.',
  },
  {
    icon: Users,
    title: 'Voyage Responsable',
    description:
      'Nous privilégions les pratiques durables et soutenons les communautés locales dans toutes nos destinations.',
  },
];