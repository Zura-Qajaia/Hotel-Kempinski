// LanguageContext.js
import { createContext, useState, useContext } from "react";
import en from "./en.json";
import it from "./it.json";

// Create the context
const LanguageContext = createContext();

// Translations as an internal constant
const translations = {
  english: en,
  italian: it,
};

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

  const switchLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "italian" : "english"
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, switchLanguage, translations: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the LanguageContext
export const useLanguage = () => useContext(LanguageContext);
