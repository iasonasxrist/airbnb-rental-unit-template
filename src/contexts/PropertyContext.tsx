
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

// Define the shape of our context
type PropertyContextType = {
  selectedProperty: string;
  selectedPropertyId: string | null;
  setSelectedProperty: (property: string, propertyId: string) => void;
  hasSelectedProperty: boolean;
  clearSelectedProperty: () => void;
};

// Create the context with a default value
const PropertyContext = createContext<PropertyContextType>({
  selectedProperty: "all",
  selectedPropertyId: null,
  setSelectedProperty: () => {},
  hasSelectedProperty: false,
  clearSelectedProperty: () => {},
});

// Custom hook to use the context
export const useProperty = () => useContext(PropertyContext);

// Provider component
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProperty, setSelectedPropertyState] = useState<string>("all");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Derived state from selectedProperty
  const hasSelectedProperty = selectedProperty !== "all" && selectedPropertyId !== null;
  
  // Load selected property from localStorage on initial render
  useEffect(() => {
    const savedProperty = localStorage.getItem("selectedProperty");
    const savedPropertyId = localStorage.getItem("selectedPropertyId");
    
    if (savedProperty && savedPropertyId) {
      setSelectedPropertyState(savedProperty);
      setSelectedPropertyId(savedPropertyId);
      
      // Only navigate to property details if on dashboard or root
      if (location.pathname === '/' || location.pathname === '/dashboard') {
        navigate(`/property/${savedPropertyId}`);
      }
    }
  }, [navigate, location.pathname]);

  // Update localStorage when property selection changes
  useEffect(() => {
    if (hasSelectedProperty) {
      localStorage.setItem("selectedProperty", selectedProperty);
      localStorage.setItem("selectedPropertyId", selectedPropertyId!);
      toast.success(`Now viewing ${selectedProperty}`);
    } else {
      localStorage.removeItem("selectedProperty");
      localStorage.removeItem("selectedPropertyId");
    }
  }, [selectedProperty, selectedPropertyId, hasSelectedProperty]);

  const setSelectedProperty = useCallback((property: string, propertyId: string) => {
    setSelectedPropertyState(property);
    setSelectedPropertyId(propertyId);
  }, []);
  
  const clearSelectedProperty = useCallback(() => {
    setSelectedPropertyState("all");
    setSelectedPropertyId(null);
  }, []);

  return (
    <PropertyContext.Provider value={{ 
      selectedProperty, 
      selectedPropertyId,
      setSelectedProperty, 
      hasSelectedProperty,
      clearSelectedProperty
    }}>
      {children}
    </PropertyContext.Provider>
  );
};
