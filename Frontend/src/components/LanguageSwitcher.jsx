import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'mr', label: 'Marathi (मराठी)' },
  { code: 'fr', label: 'French (Français)' },
  // Add more languages as needed
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '4px',
        padding: '0.25em 0.5em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}
    >
      <select
        value={i18n.language}
        onChange={e => i18n.changeLanguage(e.target.value)}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.25em 2em 0.25em 0.5em', // More right padding for arrow
          minWidth: '100px',
          appearance: 'auto', // Use browser default arrow
          background: '#fff',
        }}

        aria-label="Select language"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;

