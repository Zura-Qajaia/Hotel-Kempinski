import { createContext, useContext } from "react";

const BookingsContext = createContext(null);

export const useBookingsContext = () => useContext(BookingsContext);

export const BookingsProvider = ({ children, bookedRooms }) => (
  <BookingsContext.Provider value={bookedRooms}>
    {children}
  </BookingsContext.Provider>
);
