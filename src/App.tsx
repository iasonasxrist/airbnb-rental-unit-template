
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { PropertyProvider } from "./contexts/PropertyContext";

// Import pages
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Expenses from "./pages/Expenses";
import Bookings from "./pages/Bookings";
import PendingPayments from "./pages/PendingPayments";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PropertyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />
            <Route
              path="/properties"
              element={
                <AppLayout>
                  <Properties />
                </AppLayout>
              }
            />
            <Route
              path="/expenses"
              element={
                <AppLayout>
                  <Expenses />
                </AppLayout>
              }
            />
            <Route
              path="/bookings"
              element={
                <AppLayout>
                  <Bookings />
                </AppLayout>
              }
            />
            <Route
              path="/pending-payments"
              element={
                <AppLayout>
                  <PendingPayments />
                </AppLayout>
              }
            />
            <Route
              path="/reports"
              element={
                <AppLayout>
                  <Reports />
                </AppLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PropertyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
