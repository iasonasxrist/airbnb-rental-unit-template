import { useProperty } from "@/contexts/PropertyContext";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { propertyApi } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { properties } from "@/hooks/use-bookings";

// Define a simpler type for the dropdown that only needs id and name
type PropertyOption = {
  id: string;
  name: string;
};

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty, clearSelectedProperty, hasSelectedProperty } = useProperty();
  const location = useLocation();
  const navigate = useNavigate();
  const [propertiesList, setPropertiesList] = useState<PropertyOption[]>([]);
  const isPropertiesPage = location.pathname === "/properties";
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await propertyApi.getProperties();
        const mappedProperties: PropertyOption[] = propertiesData.map(p => ({ id: p.id, name: p.name }));
        setPropertiesList(mappedProperties);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        // Fallback to local properties if API fails
        setPropertiesList(properties.map(p => ({ id: p.id, name: p.name })));
      }
    };

    fetchProperties();
  }, []);

  const handlePropertySelect = (propertyName: string, propertyId: string) => {
    setSelectedProperty(propertyName, propertyId);
    
    // If we're already on expenses, bookings, or reports, update the URL to include the new property
    if (location.pathname.startsWith('/expenses') || 
        location.pathname.startsWith('/bookings') || 
        location.pathname.startsWith('/reports') ||
        location.pathname.startsWith('/pending-payments')) {
      const basePath = location.pathname.split('/')[1];
      navigate(`/${basePath}/${propertyId}`);
    } else {
      // Otherwise navigate to the property details page
      navigate(`/property/${propertyId}`);
    }
  };
  
  const handleViewAllProperties = () => {
    clearSelectedProperty();
    navigate("/properties");
  };

  // If we're on the properties page, don't show the dropdown
  if (isPropertiesPage) {
    return null;
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button 
            className={`flex items-center text-lg font-semibold gap-1 hover:text-primary transition-all ${
              !hasSelectedProperty 
                ? "px-4 py-2 bg-primary/10 text-primary rounded-md" 
                : ""
            }`}
          >
            {hasSelectedProperty ? selectedProperty : "Select a Property"}
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-white z-50">
          {propertiesList.map((property) => (
            <DropdownMenuItem
              key={property.id}
              onClick={() => handlePropertySelect(property.name, property.id)}
              className={`cursor-pointer ${selectedProperty === property.name ? "bg-gray-100" : ""}`}
            >
              {property.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem
            className="cursor-pointer font-medium border-t mt-1 pt-1"
            onClick={handleViewAllProperties}
          >
            View All Properties
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
