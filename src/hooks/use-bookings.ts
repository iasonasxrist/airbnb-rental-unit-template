
import { useState, useEffect } from 'react';
import { useProperty } from "@/contexts/PropertyContext";

export interface Booking {
  id: string;
  guest: string;
  property: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  platform: string;
  amount: number;
}

export interface BookingFormData {
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  platform: string;
  amount: string;
}

// Initial bookings data
const initialBookings = [
  {
    id: "1",
    guest: "John Smith",
    property: "Beach House",
    propertyId: "1",
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
    propertyId: "2",
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
    propertyId: "3",
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
    propertyId: "1",
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
    propertyId: "2",
    checkIn: "2023-04-20",
    checkOut: "2023-04-22",
    status: "completed",
    platform: "Telephone",
    amount: 400.0,
  },
];

// Available properties and platforms
export const properties = [
  { id: "1", name: "Beach House" },
  { id: "2", name: "City Apartment" },
  { id: "3", name: "Mountain Cabin" },
];

export const platforms = ["Airbnb", "Booking.com", "VRBO", "Telephone", "Other"];

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(initialBookings);
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const { selectedProperty, selectedPropertyId } = useProperty();

  // Filter bookings based on selected property and platform
  useEffect(() => {
    console.log("useBookings: Filtering with property:", selectedProperty, "propertyId:", selectedPropertyId, "and platform:", platformFilter);
    
    // Start with all bookings
    let filtered = [...bookings];
    
    // Apply property filter
    if (selectedPropertyId) {
      console.log("useBookings: Filtering by propertyId:", selectedPropertyId);
      filtered = filtered.filter((booking) => booking.propertyId === selectedPropertyId);
      console.log("useBookings: After property filter:", filtered.length, "bookings");
    }
    
    // Apply platform filter
    if (platformFilter !== "all") {
      console.log("useBookings: Filtering by platform:", platformFilter);
      filtered = filtered.filter((booking) => booking.platform === platformFilter);
      console.log("useBookings: After platform filter:", filtered.length, "bookings");
    }
    
    // Update filtered bookings
    console.log("useBookings: Final filtered bookings:", filtered.length);
    setFilteredBookings(filtered);
  }, [selectedProperty, selectedPropertyId, platformFilter, bookings]);

  // Handle adding a new booking
  const addBooking = (newBookingData: BookingFormData) => {
    // Find property ID from name
    const propertyData = properties.find(p => p.name === newBookingData.property);
    const propertyId = propertyData ? propertyData.id : "1"; // Default to first property if not found

    const booking: Booking = {
      id: (bookings.length + 1).toString(),
      guest: newBookingData.guest,
      property: newBookingData.property,
      propertyId: propertyId,
      checkIn: newBookingData.checkIn,
      checkOut: newBookingData.checkOut,
      status: "upcoming",
      platform: newBookingData.platform,
      amount: parseFloat(newBookingData.amount),
    };

    setBookings([...bookings, booking]);
  };

  return {
    bookings,
    filteredBookings,
    platformFilter,
    setPlatformFilter,
    addBooking,
  };
}
