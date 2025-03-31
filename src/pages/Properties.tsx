
import { useState } from "react";
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
          <Card key={property.id}>
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
              <Button variant="outline" size="sm">
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
