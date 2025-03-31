import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { toast } = useToast();
  const { selectedProperty } = useProperty();
  const isMobile = useIsMobile();
  const location = useLocation();

  // This would normally be replaced with a real email notification system
  // that checks for upcoming bookings and sends emails automatically
  useEffect(() => {
    // Simulate checking for upcoming bookings
    const checkUpcomingBookings = () => {
      const today = new Date();
      const upcomingDate = new Date();
      upcomingDate.setDate(today.getDate() + 3); // Check for bookings 3 days from now
      
      // This would normally be a database query to find upcoming bookings
      // For now, we'll just show a toast to demonstrate the concept
      toast({
        title: "Booking Reminder System Active",
        description: `${selectedProperty === "all" ? "All properties" : selectedProperty}: The system is now monitoring for upcoming bookings to send email notifications.`,
      });
    };
    
    // Run once when component mounts or selected property changes
    checkUpcomingBookings();
    
    // In a real app, this would be a scheduled job or webhook
    const intervalId = setInterval(checkUpcomingBookings, 24 * 60 * 60 * 1000); // Check once per day
    
    return () => clearInterval(intervalId);
  }, [toast, selectedProperty]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
      <footer className="bg-gray-100 py-4 px-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Airbnb Property Management</p>
        <p className="mt-1">Email notifications are sent for upcoming bookings</p>
      </footer>
    </div>
  );
}
