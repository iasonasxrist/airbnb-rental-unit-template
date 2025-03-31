
import { useProperty } from "@/contexts/PropertyContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample properties - in a real app, this would come from your database
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty } = useProperty();
  const isMobile = useIsMobile();
  const [sheetOpen, setSheetOpen] = useState(false);

  // For extremely small mobile screens
  if (isMobile && window.innerWidth < 360) {
    return (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2 truncate">
              <Building className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">
                {selectedProperty === "all" ? "All Properties" : selectedProperty}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="p-0">
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-medium">Select Property</h3>
            <div className="grid gap-2">
              <Button
                variant={selectedProperty === "all" ? "default" : "outline"}
                className="justify-start"
                onClick={() => {
                  setSelectedProperty("all");
                  setSheetOpen(false);
                }}
              >
                All Properties
              </Button>
              {properties.map((property) => (
                <Button
                  key={property.id}
                  variant={selectedProperty === property.name ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => {
                    setSelectedProperty(property.name);
                    setSheetOpen(false);
                  }}
                >
                  {property.name}
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // For tablets and larger phones
  return (
    <div className="flex items-center space-x-2">
      <Building className="w-4 h-4 text-muted-foreground" />
      <Select
        value={selectedProperty}
        onValueChange={setSelectedProperty}
      >
        <SelectTrigger className={`${isMobile ? "w-full max-w-[260px]" : "w-[180px]"}`}>
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
