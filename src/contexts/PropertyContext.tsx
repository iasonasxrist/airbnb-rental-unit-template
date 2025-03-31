
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our context
type PropertyContextType = {
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
};

// Create the context with a default value
const PropertyContext = createContext<PropertyContextType>({
  selectedProperty: "all",
  setSelectedProperty: () => {},
});

// Custom hook to use the context
export const useProperty = () => useContext(PropertyContext);

// Provider component
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedProperty] = useState<string>("all");

  return (
    <PropertyContext.Provider value={{ selectedProperty, setSelectedProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
