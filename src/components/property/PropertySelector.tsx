
import { useProperty } from "@/contexts/PropertyContext";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function PropertySelector() {
  const { selectedProperty } = useProperty();
  const location = useLocation();
  
  // Don't show the breadcrumb on the properties listing page
  if (location.pathname === "/properties") {
    return null;
  }
  
  // Only show the breadcrumb when a specific property is selected
  if (selectedProperty === "all") {
    return null;
  }

  return (
    <div className="flex items-center text-sm">
      <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
        Dashboard
      </Link>
      <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
      <Link to="/properties" className="text-muted-foreground hover:text-foreground">
        Properties
      </Link>
      {selectedProperty !== "all" && (
        <>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">{selectedProperty}</span>
        </>
      )}
    </div>
  );
}
