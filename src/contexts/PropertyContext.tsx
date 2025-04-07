
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

// Define the shape of our context
type PropertyContextType = {
  selectedProperty: string;
  selectedPropertyId: string | null;
  setSelectedProperty: (property: string, propertyId?: string) => void;
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
  const [hasSelectedProperty, setHasSelectedProperty] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set up the selected property effect
  useEffect(() => {
    console.log("PropertyContext: selectedProperty changed to", selectedProperty);
    
    // Update hasSelectedProperty state
    setHasSelectedProperty(selectedProperty !== "all");
    
    // Store the selected property in localStorage to persist between page refreshes
    if (selectedProperty !== "all" && selectedPropertyId) {
      localStorage.setItem("selectedProperty", selectedProperty);
      localStorage.setItem("selectedPropertyId", selectedPropertyId);
      toast.success(`Now viewing ${selectedProperty}`);
    } else if (selectedProperty === "all") {
      localStorage.removeItem("selectedProperty");
      localStorage.removeItem("selectedPropertyId");
    }
  }, [selectedProperty, selectedPropertyId]);
  
  // Load selected property from localStorage on initial render
  useEffect(() => {
    const savedProperty = localStorage.getItem("selectedProperty");
    const savedPropertyId = localStorage.getItem("selectedPropertyId");
    
    if (savedProperty && savedPropertyId) {
      setSelectedPropertyState(savedProperty);
      setSelectedPropertyId(savedPropertyId);
      console.log("PropertyContext: Loaded saved property from localStorage:", savedProperty);
      
      // Navigate to property page if on root
      if (location.pathname === '/' || location.pathname === '/dashboard') {
        navigate(`/property/${savedPropertyId}`);
      }
    }
  }, [navigate, location.pathname]);

  const setSelectedProperty = useCallback((property: string, propertyId?: string) => {
    console.log("PropertyContext: setSelectedProperty called with", property, propertyId);
    setSelectedPropertyState(property);
    
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    } else if (property === "all") {
      setSelectedPropertyId(null);
    }
  }, []);
  
  const clearSelectedProperty = useCallback(() => {
    setSelectedPropertyState("all");
    setSelectedPropertyId(null);
    localStorage.removeItem("selectedProperty");
    localStorage.removeItem("selectedPropertyId");
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
