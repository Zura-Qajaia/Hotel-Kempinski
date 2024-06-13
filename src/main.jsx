import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BookingsProvider } from "./../src/pages/BookingContext.jsx";

import { LanguageProvider } from "./LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <BookingsProvider>
        <App />
      </BookingsProvider>
    </LanguageProvider>
  </React.StrictMode>
);
