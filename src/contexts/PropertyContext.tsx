
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { toast } from "sonner";

// Define the shape of our context
type PropertyContextType = {
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
  hasSelectedProperty: boolean;
};

// Create the context with a default value
const PropertyContext = createContext<PropertyContextType>({
  selectedProperty: "all",
  setSelectedProperty: () => {},
  hasSelectedProperty: false,
});

// Custom hook to use the context
export const useProperty = () => useContext(PropertyContext);

// Provider component
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedPropertyState] = useState<string>("all");
  const [hasSelectedProperty, setHasSelectedProperty] = useState<boolean>(false);
  
  // Log when selectedProperty changes for debugging
  useEffect(() => {
    console.log("PropertyContext: selectedProperty changed to", selectedProperty);
    
    // Update hasSelectedProperty state
    setHasSelectedProperty(selectedProperty !== "all");
    
    // Store the selected property in localStorage to persist between page refreshes
    if (selectedProperty !== "all") {
      localStorage.setItem("selectedProperty", selectedProperty);
      toast.success(`Now viewing ${selectedProperty}`);
    } else {
      localStorage.removeItem("selectedProperty");
    }
  }, [selectedProperty]);
  
  // Load selected property from localStorage on initial render
  useEffect(() => {
    const savedProperty = localStorage.getItem("selectedProperty");
    if (savedProperty) {
      setSelectedPropertyState(savedProperty);
      console.log("PropertyContext: Loaded saved property from localStorage:", savedProperty);
    }
  }, []);

  const setSelectedProperty = useCallback((property: string) => {
    console.log("PropertyContext: setSelectedProperty called with", property);
    setSelectedPropertyState(property);
  }, []);

  return (
    <PropertyContext.Provider value={{ selectedProperty, setSelectedProperty, hasSelectedProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
