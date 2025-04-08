
import { Building } from "lucide-react";
import { useProperty } from "@/contexts/PropertyContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PropertyDashboard } from "@/components/dashboard/PropertyDashboard";

const Dashboard = () => {
  const { hasSelectedProperty, selectedProperty, selectedPropertyId } = useProperty();
  const navigate = useNavigate();

  if (hasSelectedProperty && selectedPropertyId) {
    return <PropertyDashboard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <h2 className="text-2xl font-semibold mb-2">Welcome to AirCost</h2>
      <p className="text-muted-foreground mb-6">
        Please select a property from the dropdown above or view all your properties.
      </p>
      <Building className="h-16 w-16 text-primary opacity-50 mb-4" />
      <Button 
        onClick={() => navigate("/properties")}
        className="mt-4"
      >
        View All Properties
      </Button>
      <p className="max-w-md text-sm text-muted-foreground mt-6">
        Once you select a property, you'll be able to see all your expenses, bookings, and analytics.
      </p>
    </div>
  );
};

export default Dashboard;
