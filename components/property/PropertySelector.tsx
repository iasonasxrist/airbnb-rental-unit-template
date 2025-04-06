
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

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty } = useProperty();
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const isPropertiesPage = location.pathname === "/properties";
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await propertyApi.getProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
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
        <DropdownMenuContent align="start" className="w-56 bg-white">
          <DropdownMenuItem 
            onClick={() => handlePropertySelect("all")}
            className={selectedProperty === "all" ? "bg-gray-100" : ""}
          >
            All Properties
          </DropdownMenuItem>
          
          {properties.map((property) => (
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
