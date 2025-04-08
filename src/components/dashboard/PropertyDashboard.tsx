
import { useState, useEffect } from "react";
import { BarChart, DollarSign, Phone, Calendar } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TelephoneBookingForm } from "@/components/booking/TelephoneBookingForm";
import { useProperty } from "@/contexts/PropertyContext";

// Sample data - in a real app, this would come from your database
const initialProperties = [
  {
    id: "1",
    name: "Beach House",
    monthlyExpenses: 850,
    monthlyRevenue: 3200,
    bookingsCount: 12,
  },
  {
    id: "2",
    name: "City Apartment",
    monthlyExpenses: 750,
    monthlyRevenue: 2800,
    bookingsCount: 9,
  },
  {
    id: "3",
    name: "Mountain Cabin",
    monthlyExpenses: 600,
    monthlyRevenue: 2500,
    bookingsCount: 7,
  },
];

export function PropertyDashboard() {
  const { selectedPropertyId } = useProperty();
  const [propertyStats, setPropertyStats] = useState<any>(null);

  useEffect(() => {
    if (selectedPropertyId) {
      const stats = initialProperties.find(p => p.id === selectedPropertyId);
      if (stats) {
        setPropertyStats(stats);
      }
    }
  }, [selectedPropertyId]);

  if (!propertyStats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">{propertyStats.name} Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Monthly Revenue"
          value={`$${propertyStats.monthlyRevenue.toFixed(2)}`}
          subtitle={`For ${propertyStats.name}`}
          icon={DollarSign}
          positive={true}
          change="12%"
        />
        <StatsCard
          title="Monthly Expenses"
          value={`$${propertyStats.monthlyExpenses.toFixed(2)}`}
          subtitle={`For ${propertyStats.name}`}
          icon={BarChart}
          positive={false}
          change="5%"
        />
        <StatsCard
          title="Total Bookings"
          value={propertyStats.bookingsCount.toString()}
          subtitle={`For ${propertyStats.name}`}
          icon={Calendar}
          positive={true}
          change="3"
        />
      </div>

      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expenses & Analytics</TabsTrigger>
          <TabsTrigger value="telephone-booking">Add Telephone Booking</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ExpenseChart propertyId={selectedPropertyId} />
            <RecentExpenses propertyId={selectedPropertyId} />
          </div>
        </TabsContent>
        <TabsContent value="telephone-booking">
          <TelephoneBookingForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
