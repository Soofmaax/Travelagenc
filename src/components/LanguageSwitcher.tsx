import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${i18n.language === 'en' ? 'French' : 'English'}`}
    >
      <Globe size={20} />
      <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSwitcher;