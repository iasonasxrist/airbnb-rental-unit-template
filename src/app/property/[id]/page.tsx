
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";

// Sample data - in a real app, this would come from your database
const initialProperties = [
  {
    id: "1",
    name: "Beach House",
    address: "123 Ocean Ave, Miami, FL",
    status: "active",
    monthlyRevenue: 3200,
    monthlyExpenses: 850,
  },
  {
    id: "2",
    name: "City Apartment",
    address: "456 Main St, New York, NY",
    status: "active",
    monthlyRevenue: 2800,
    monthlyExpenses: 750,
  },
  {
    id: "3",
    name: "Mountain Cabin",
    address: "789 Pine Rd, Aspen, CO",
    status: "active",
    monthlyRevenue: 2500,
    monthlyExpenses: 600,
  },
];

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const { toast } = useToast();
  const { setSelectedProperty } = useProperty();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const foundProperty = initialProperties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
        setSelectedProperty(foundProperty.name);
      } else {
        navigate("/properties");
        toast({
          title: "Property not found",
          description: "The requested property could not be found",
          variant: "destructive",
        });
      }
    }
  }, [id, setSelectedProperty, navigate, toast]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{property.name}</h1>
        <Button variant="outline" onClick={() => navigate("/properties")}>
          Back to All Properties
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>{property.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  {property.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Monthly Revenue:</span>
                <span>${property.monthlyRevenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Monthly Expenses:</span>
                <span>${property.monthlyExpenses}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Profit:</span>
                <span className="font-bold">
                  ${property.monthlyRevenue - property.monthlyExpenses}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => navigate("/bookings")}>View Bookings</Button>
            <Button onClick={() => navigate("/expenses")}>View Expenses</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Last 30 days statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Occupancy Rate:</span>
                <span>85%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Average Daily Rate:</span>
                <span>$145</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Bookings:</span>
                <span>12</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Repeat Guests:</span>
                <span>3</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/reports")}>
              View Detailed Reports
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetails;
