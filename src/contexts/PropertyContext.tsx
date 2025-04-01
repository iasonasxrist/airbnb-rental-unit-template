
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { toast } from "sonner";

// Define rate limiting parameters
const RATE_LIMIT_INTERVAL = 2000; // 2 seconds
const RATE_LIMIT_MAX_CALLS = 5;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

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
  const [selectedProperty, setSelectedPropertyState] = useState<string>("all");
  
  // Rate limiting state
  const [lastCallTime, setLastCallTime] = useState<number>(0);
  const [callsInWindow, setCallsInWindow] = useState<number>(0);
  const [windowStartTime, setWindowStartTime] = useState<number>(Date.now());

  // Log when selectedProperty changes for debugging
  useEffect(() => {
    console.log("PropertyContext: selectedProperty changed to", selectedProperty);
  }, [selectedProperty]);

  // Rate-limited version of setSelectedProperty
  const setSelectedProperty = useCallback((property: string) => {
    const now = Date.now();
    
    // Reset window if needed
    if (now - windowStartTime > RATE_LIMIT_WINDOW) {
      setWindowStartTime(now);
      setCallsInWindow(0);
    }
    
    // Check if we've exceeded the rate limit
    if (callsInWindow >= RATE_LIMIT_MAX_CALLS) {
      toast.error(`Rate limit exceeded. Please try again in ${Math.ceil((windowStartTime + RATE_LIMIT_WINDOW - now) / 1000)} seconds.`);
      return;
    }
    
    // Check if we need to throttle
    if (now - lastCallTime < RATE_LIMIT_INTERVAL) {
      toast.warning("Please slow down your requests.");
      return;
    }
    
    // Update state
    setLastCallTime(now);
    setCallsInWindow(prev => prev + 1);
    setSelectedPropertyState(property);
  }, [lastCallTime, callsInWindow, windowStartTime]);

  return (
    <PropertyContext.Provider value={{ selectedProperty, setSelectedProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};
