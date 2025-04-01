
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProperty } from "@/contexts/PropertyContext";

interface Property {
  id: string;
  name: string;
}

interface BookingFormData {
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  platform: string;
  amount: string;
}

interface BookingDialogProps {
  properties: Property[];
  platforms: string[];
  onAddBooking: (booking: BookingFormData) => void;
}

export function BookingDialog({ properties, platforms, onAddBooking }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const { selectedProperty } = useProperty();
  const [newBooking, setNewBooking] = useState<BookingFormData>({
    guest: "",
    property: selectedProperty !== "all" ? selectedProperty : "",
    checkIn: "",
    checkOut: "",
    platform: "",
    amount: "",
  });

  const handleSubmit = () => {
    onAddBooking(newBooking);
    setNewBooking({
      guest: "",
      property: selectedProperty !== "all" ? selectedProperty : "",
      checkIn: "",
      checkOut: "",
      platform: "",
      amount: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Booking
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
          <DialogDescription>
            Record a new booking for one of your properties.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="guest">Guest Name</Label>
            <Input
              id="guest"
              value={newBooking.guest}
              onChange={(e) =>
                setNewBooking({ ...newBooking, guest: e.target.value })
              }
              placeholder="John Smith"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="property">Property</Label>
            <Select
              onValueChange={(value) =>
                setNewBooking({ ...newBooking, property: value })
              }
              value={newBooking.property}
              defaultValue={selectedProperty !== "all" ? selectedProperty : undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a property" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {properties.map((property) => (
                  <SelectItem key={property.id} value={property.name}>
                    {property.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="checkIn">Check In</Label>
              <Input
                id="checkIn"
                type="date"
                value={newBooking.checkIn}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, checkIn: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="checkOut">Check Out</Label>
              <Input
                id="checkOut"
                type="date"
                value={newBooking.checkOut}
                onChange={(e) =>
                  setNewBooking({
                    ...newBooking,
                    checkOut: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              onValueChange={(value) =>
                setNewBooking({ ...newBooking, platform: value })
              }
              value={newBooking.platform}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={newBooking.amount}
              onChange={(e) =>
                setNewBooking({ ...newBooking, amount: e.target.value })
              }
              placeholder="0.00"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
