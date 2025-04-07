
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useProperty } from "@/contexts/PropertyContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { selectedProperty, selectedPropertyId } = useProperty();
  const location = useLocation();
  const { propertyId } = useParams();

  // Generate a key for the AnimatePresence based on the current path and property
  const getAnimationKey = () => {
    const basePath = location.pathname.split('/')[1];
    if (propertyId || selectedPropertyId) {
      return `${basePath}-${propertyId || selectedPropertyId}`;
    }
    return basePath;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col">
          <Header />
          <AnimatePresence mode="wait">
            <motion.div 
              key={getAnimationKey()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-4 md:p-6"
            >
              {children}
            </motion.div>
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
