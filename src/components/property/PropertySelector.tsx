
import { useProperty } from "@/contexts/PropertyContext";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "react-router-dom";
import { Property, propertyApi } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { properties } from "@/hooks/use-bookings";

// Define a simpler type for the dropdown that only needs id and name
type PropertyOption = {
  id: string;
  name: string;
};

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty } = useProperty();
  const location = useLocation();
  const [propertiesList, setPropertiesList] = useState<PropertyOption[]>([]);
  const isPropertiesPage = location.pathname === "/properties";
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await propertyApi.getProperties();
        // Map the full Property objects to just the id and name needed for the dropdown
        setPropertiesList(propertiesData.map(p => ({ id: p.id, name: p.name })));
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        // Fallback to local properties if API fails
        setPropertiesList(properties.map(p => ({ id: p.id, name: p.name })));
      }
    };

    fetchProperties();
  }, []);

  const handlePropertySelect = (propertyName: string) => {
    setSelectedProperty(propertyName);
  };

  const getSelectedPropertyName = () => {
    if (selectedProperty === "all") {
      return "All Properties";
    }
    return selectedProperty;
  };

  // If we're on the properties page, return null, but AFTER all hooks are called
  if (isPropertiesPage) {
    return null;
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center text-lg font-semibold gap-1 hover:text-primary">
            {getSelectedPropertyName()}
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-white z-50">
          <DropdownMenuItem 
            onClick={() => handlePropertySelect("all")}
            className={selectedProperty === "all" ? "bg-gray-100" : ""}
          >
            All Properties
          </DropdownMenuItem>
          
          {propertiesList.map((property) => (
            <DropdownMenuItem
              key={property.id}
              onClick={() => handlePropertySelect(property.name)}
              className={selectedProperty === property.name ? "bg-gray-100" : ""}
            >
              {property.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
