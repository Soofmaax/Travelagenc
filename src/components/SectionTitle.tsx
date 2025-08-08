import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  underline?: boolean;
  className?: string;
}

/**
 * Reusable section title component with optional subtitle and styling options
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  underline = false,
  className = ''
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2 className={`font-serif text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 ${underline ? 'title-underline' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-600 dark:text-gray-300 ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;