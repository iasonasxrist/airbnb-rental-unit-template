
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";
import { useNavigate, useParams } from "react-router-dom";

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

const Properties = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { setSelectedProperty } = useProperty();
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<any>(null);

  useEffect(() => {
    if (propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (property) {
        setSelectedProperty(property.name);
        setSelectedPropertyDetails(property);
      } else {
        navigate("/properties");
        toast({
          title: "Property not found",
          description: "The requested property could not be found",
          variant: "destructive",
        });
      }
    }
  }, [propertyId, properties, setSelectedProperty, navigate, toast]);

  const handleAddProperty = () => {
    if (!newProperty.name || !newProperty.address) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const property = {
      id: (properties.length + 1).toString(),
      name: newProperty.name,
      address: newProperty.address,
      status: "active",
      monthlyRevenue: 0,
      monthlyExpenses: 0,
    };

    setProperties([...properties, property]);
    setNewProperty({ name: "", address: "" });
    setOpen(false);

    toast({
      title: "Property added",
      description: `${property.name} has been added to your properties`,
    });
  };

  const handleViewData = (propertyId: string, propertyName: string) => {
    setSelectedProperty(propertyName);
    navigate(`/property/${propertyId}`);
  };

  // If we're viewing a specific property
  if (selectedPropertyDetails) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{selectedPropertyDetails.name}</h1>
          <Button variant="outline" onClick={() => navigate("/properties")}>
            Back to All Properties
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>{selectedPropertyDetails.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    {selectedPropertyDetails.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Monthly Revenue:</span>
                  <span>${selectedPropertyDetails.monthlyRevenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Monthly Expenses:</span>
                  <span>${selectedPropertyDetails.monthlyExpenses}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Profit:</span>
                  <span className="font-bold">
                    ${selectedPropertyDetails.monthlyRevenue - selectedPropertyDetails.monthlyExpenses}
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
  }

  // Default view - list of properties
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Enter the details of your new property here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  value={newProperty.name}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, name: e.target.value })
                  }
                  placeholder="Beach House"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newProperty.address}
                  onChange={(e) =>
                    setNewProperty({ ...newProperty, address: e.target.value })
                  }
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProperty}>Add Property</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{property.name}</CardTitle>
              <CardDescription>{property.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  {property.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ID: {property.id}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Monthly Revenue:</span>
                  <span className="text-sm">${property.monthlyRevenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Monthly Expenses:</span>
                  <span className="text-sm">${property.monthlyExpenses}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Profit:</span>
                  <span className="text-sm font-bold">
                    ${property.monthlyRevenue - property.monthlyExpenses}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleViewData(property.id, property.name)}
              >
                View Details
              </Button>
              <Button size="sm">Manage</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Properties;
