
import { useProperty } from "@/contexts/PropertyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building } from "lucide-react";

// Sample properties - in a real app, this would come from your database
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty } = useProperty();

  return (
    <div className="flex items-center space-x-2">
      <Building className="w-4 h-4 text-muted-foreground" />
      <Select
        value={selectedProperty}
        onValueChange={setSelectedProperty}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select property" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>
          {properties.map((property) => (
            <SelectItem key={property.id} value={property.name}>
              {property.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
