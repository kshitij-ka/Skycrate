# TRANSLATION

This is a comprehensive guide for translation for those who wish to contribute in any language.

---

## 1. Add Your Language JSON File

- Go to the `Frontend/src/locales/` directory.
- Copy an existing language file (e.g., `en.json`) and rename it to your language code (e.g., `es.json` for Spanish, `de.json` for German).
- Translate all the key-value pairs in your new file.

**Example:**

```shell
cp Frontend/src/locales/en.json Frontend/src/locales/es.json
```

```json
{
  "skycrate": "Skycrate",
  "hero_subtitle": "Store, Access & Share Your Files — Anytime, Anywhere!",
}
```

## 2. Register the Language in `Frontend/src/i18n.js`

- Open `Frontend/src/i18n.js`.
- Import your new JSON file:

```js
import en from './locales/en.json';
import fr from './locales/fr.json';
// import more languages as needed
import es from './locales/es.json'; // <-- Add this line

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  // add other languages here
  es: { translation: es }, // <-- Add this line
};
```

## 3. Update the Language Switcher

- Open `Frontend/src/components/LanguageSwitcher.jsx`.
- Add your language to the `languages` array:


```js
const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  // Add more languages as needed
  { code: 'es', label: 'Spanish' }, // <-- Add this line
];
```

## 4. Test Your Translation

- Start the app.
- Use the language switcher to select your new language.
- Check all pages for missing or untranslated keys.
- If you see a key instead of a translation, add it to your JSON file.

## 5. Submit Your Contribution

- Double-check your translations for accuracy and completeness.
- Commit your changes to:
- `Frontend/src/locales/<your_language>.json`
- `Frontend/src/i18n.js`
- `Frontend/src/components/LanguageSwitcher.jsx`
- Open a pull request with a description of your contribution.

---

## Thank you for making Skycrate accessible to more people!
