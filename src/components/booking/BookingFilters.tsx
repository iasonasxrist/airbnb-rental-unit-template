
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingFiltersProps {
  platformFilter: string;
  onPlatformFilterChange: (value: string) => void;
  platforms: string[];
}

export function BookingFilters({ 
  platformFilter, 
  onPlatformFilterChange,
  platforms 
}: BookingFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter Platform
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={platformFilter}
          onValueChange={onPlatformFilterChange}
        >
          <DropdownMenuRadioItem value="all">
            All Platforms
          </DropdownMenuRadioItem>
          {platforms.map((platform) => (
            <DropdownMenuRadioItem key={platform} value={platform}>
              {platform}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
