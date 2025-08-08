import React from 'react';
import SectionTitle from './SectionTitle';
import FeatureCard from './FeatureCard';
import { features } from '../data/features';

/**
 * Features section component displaying why choose VoyageExplore
 */
const FeaturesSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="container-custom">
        <SectionTitle
          title="Pourquoi Choisir VoyageExplore"
          subtitle="Nous créons des expériences de voyage premium avec une attention particulière à chaque détail, pour que votre voyage soit aussi remarquable que la destination."
          centered
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;