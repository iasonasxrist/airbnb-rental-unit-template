
import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

// Import pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetails from "./app/property/[id]/page";
import Expenses from "./pages/Expenses";
import Bookings from "./pages/Bookings";
import PendingPayments from "./pages/PendingPayments";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Pricing from "./pages/Pricing";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/pricing" element={<Pricing />} />
    
    {/* Protected Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/properties"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Properties />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/property/:id"
      element={
        <ProtectedRoute>
          <AppLayout>
            <PropertyDetails />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/expenses"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Expenses />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/bookings"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Bookings />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/pending-payments"
      element={
        <ProtectedRoute>
          <AppLayout>
            <PendingPayments />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/reports"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Reports />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
