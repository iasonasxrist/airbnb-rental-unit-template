
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - in a real app, this would come from your database
const initialBookings = [
  {
    id: "1",
    guest: "John Smith",
    property: "Beach House",
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    status: "upcoming",
    platform: "Airbnb",
    amount: 850.0,
  },
  {
    id: "2",
    guest: "Jane Doe",
    property: "City Apartment",
    checkIn: "2023-05-22",
    checkOut: "2023-05-25",
    status: "upcoming",
    platform: "Telephone",
    amount: 600.0,
  },
  {
    id: "3",
    guest: "Bob Johnson",
    property: "Mountain Cabin",
    checkIn: "2023-06-01",
    checkOut: "2023-06-07",
    status: "upcoming",
    platform: "Airbnb",
    amount: 1200.0,
  },
  {
    id: "4",
    guest: "Alice Brown",
    property: "Beach House",
    checkIn: "2023-04-10",
    checkOut: "2023-04-15",
    status: "completed",
    platform: "Airbnb",
    amount: 750.0,
  },
  {
    id: "5",
    guest: "Charlie Wilson",
    property: "City Apartment",
    checkIn: "2023-04-20",
    checkOut: "2023-04-22",
    status: "completed",
    platform: "Telephone",
    amount: 400.0,
  },
];

// Sample properties for the dropdown
const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

// Booking platforms
const platforms = ["Airbnb", "Booking.com", "VRBO", "Telephone", "Other"];

const Bookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [filteredBookings, setFilteredBookings] = useState(initialBookings);
  const [open, setOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("all");
  const [newBooking, setNewBooking] = useState({
    guest: "",
    property: "",
    checkIn: "",
    checkOut: "",
    platform: "",
    amount: "",
  });
  const { toast } = useToast();

  const handleAddBooking = () => {
    if (
      !newBooking.guest ||
      !newBooking.property ||
      !newBooking.checkIn ||
      !newBooking.checkOut ||
      !newBooking.platform ||
      !newBooking.amount
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const booking = {
      id: (bookings.length + 1).toString(),
      guest: newBooking.guest,
      property: newBooking.property,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      status: "upcoming",
      platform: newBooking.platform,
      amount: parseFloat(newBooking.amount),
    };

    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    
    // Apply current filter to the updated bookings
    if (platformFilter === "all") {
      setFilteredBookings(updatedBookings);
    } else {
      setFilteredBookings(
        updatedBookings.filter((book) => book.platform === platformFilter)
      );
    }

    setNewBooking({
      guest: "",
      property: "",
      checkIn: "",
      checkOut: "",
      platform: "",
      amount: "",
    });
    setOpen(false);

    toast({
      title: "Booking added",
      description: `A new booking for ${booking.guest} has been added`,
    });
  };

  const handleFilterChange = (value: string) => {
    setPlatformFilter(value);
    
    if (value === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.platform === value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={platformFilter}
                onValueChange={handleFilterChange}
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
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
                    <SelectContent>
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
                <Button onClick={handleAddBooking}>Add Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {platformFilter === "all"
              ? "All Bookings"
              : `${platformFilter} Bookings`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.guest}
                  </TableCell>
                  <TableCell>{booking.property}</TableCell>
                  <TableCell>
                    {booking.checkIn} to {booking.checkOut}
                  </TableCell>
                  <TableCell>{booking.platform}</TableCell>
                  <TableCell className="text-right">
                    ${booking.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        booking.status === "upcoming"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
