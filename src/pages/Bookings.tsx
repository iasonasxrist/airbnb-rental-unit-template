
import { useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";
import { BookingFilters } from "@/components/booking/BookingFilters";
import { BookingDialog } from "@/components/booking/BookingDialog";
import { useBookings, properties, platforms } from "@/hooks/use-bookings";

const Bookings = () => {
  const { selectedProperty } = useProperty();
  const { toast } = useToast();
  const {
    filteredBookings,
    platformFilter,
    setPlatformFilter,
    addBooking,
  } = useBookings();

  // Log changes to filtered bookings for debugging
  useEffect(() => {
    console.log("Bookings page: filteredBookings length:", filteredBookings.length);
  }, [filteredBookings]);

  const handleAddBooking = (newBookingData: any) => {
    if (
      !newBookingData.guest ||
      !newBookingData.property ||
      !newBookingData.checkIn ||
      !newBookingData.checkOut ||
      !newBookingData.platform ||
      !newBookingData.amount
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    addBooking(newBookingData);

    toast({
      title: "Booking added",
      description: `A new booking for ${newBookingData.guest} has been added`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <div className="flex space-x-2">
          <BookingFilters 
            platformFilter={platformFilter}
            onPlatformFilterChange={setPlatformFilter}
            platforms={platforms}
          />

          <BookingDialog 
            properties={properties}
            platforms={platforms}
            onAddBooking={handleAddBooking}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedProperty !== "all" 
              ? platformFilter === "all" 
                ? `Bookings for ${selectedProperty}`
                : `${platformFilter} Bookings for ${selectedProperty}`
              : platformFilter === "all"
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
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No bookings found for this property
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
