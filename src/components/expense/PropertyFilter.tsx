
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyFilterProps {
  propertyFilter: string;
  handleFilterChange: (value: string) => void;
  properties: { id: string; name: string }[];
}

export function PropertyFilter({
  propertyFilter,
  handleFilterChange,
  properties,
}: PropertyFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white z-50">
        <DropdownMenuLabel>Filter by Property</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={propertyFilter}
          onValueChange={handleFilterChange}
        >
          <DropdownMenuRadioItem value="all">
            All Properties
          </DropdownMenuRadioItem>
          {properties.map((property) => (
            <DropdownMenuRadioItem
              key={property.id}
              value={property.name}
            >
              {property.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
