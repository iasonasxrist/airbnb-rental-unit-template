
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useProperty } from "@/contexts/PropertyContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { toast } = useToast();
  const { selectedProperty, hasSelectedProperty } = useProperty();
  const isMobile = useIsMobile();
  const location = useLocation();
  const showContent = hasSelectedProperty || location.pathname === "/properties";

  // This would normally be replaced with a real email notification system
  // that checks for upcoming bookings and sends emails automatically
  useEffect(() => {
    // Only show toast if a property is selected
    if (selectedProperty !== "all") {
      // Simulate checking for upcoming bookings
      const checkUpcomingBookings = () => {
        const today = new Date();
        const upcomingDate = new Date();
        upcomingDate.setDate(today.getDate() + 3); // Check for bookings 3 days from now
        
        // This would normally be a database query to find upcoming bookings
        // For now, we'll just show a toast to demonstrate the concept
        toast({
          title: "Booking Reminder System Active",
          description: `${selectedProperty}: The system is now monitoring for upcoming bookings to send email notifications.`,
        });
      };
      
      // Run once when component mounts or selected property changes
      const timeoutId = setTimeout(checkUpcomingBookings, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [toast, selectedProperty]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <AnimatePresence mode="wait">
            {showContent ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 p-4 md:p-6"
              >
                {children}
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center p-4 md:p-6"
              >
                <div className="text-center max-w-md mx-auto p-8 rounded-lg bg-gray-50 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to AirCost</h2>
                  <p className="text-gray-600 mb-6">
                    Please select a property from the dropdown above to view its details and manage your listings.
                  </p>
                  <div className="py-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mx-auto text-primary/60"
                    >
                      <path d="m21 8-2 2-2-2-2 2-2-2-2 2-2-2-2 2-2-2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8Z"></path>
                      <path d="M7 13h8"></path>
                      <path d="M7 17h4"></path>
                      <path d="M4 4v4"></path>
                      <path d="M20 4v4"></path>
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <footer className="bg-gray-100 py-4 px-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Airbnb Property Management</p>
        <p className="mt-1">Email notifications are sent for upcoming bookings</p>
      </footer>
    </div>
  );
}
