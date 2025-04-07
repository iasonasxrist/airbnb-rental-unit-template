
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
  
  // Extract property ID from URL if present
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    
    // Check if path contains a propertyId
    if (
      (pathParts[1] === 'property' || 
       pathParts[1] === 'expenses' ||
       pathParts[1] === 'bookings' ||
       pathParts[1] === 'reports' ||
       pathParts[1] === 'pending-payments') && 
      pathParts.length >= 3
    ) {
      const urlPropertyId = pathParts[2];
      const savedPropertyName = localStorage.getItem("selectedProperty");
      
      // If property ID in URL differs from stored ID, update localStorage
      if (urlPropertyId !== selectedPropertyId) {
        localStorage.setItem("selectedPropertyId", urlPropertyId);
        
        // If we have a saved property name for this ID, use it
        if (savedPropertyName) {
          setSelectedPropertyState(savedPropertyName);
          setSelectedPropertyId(urlPropertyId);
        } else {
          // We'll need to fetch the property name from somewhere, for now just use ID
          setSelectedPropertyState(`Property ${urlPropertyId}`);
          setSelectedPropertyId(urlPropertyId);
        }
      }
    }
  }, [location.pathname, selectedPropertyId]);
  
  // Load selected property from localStorage on initial render
  useEffect(() => {
    const savedProperty = localStorage.getItem("selectedProperty");
    const savedPropertyId = localStorage.getItem("selectedPropertyId");
    
    if (savedProperty && savedPropertyId) {
      setSelectedPropertyState(savedProperty);
      setSelectedPropertyId(savedPropertyId);
    }
  }, []);

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
