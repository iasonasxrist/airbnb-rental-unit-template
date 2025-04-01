
import { Building, DollarSign, Phone, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { PendingPayments } from "@/components/dashboard/PendingPayments";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { useProperty } from "@/contexts/PropertyContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { hasSelectedProperty, selectedProperty } = useProperty();

  if (!hasSelectedProperty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome to AirCost</h2>
        <p className="text-muted-foreground mb-6">
          Please select a property from the dropdown above to view your dashboard.
        </p>
        <Building className="h-16 w-16 text-primary opacity-50 mb-4" />
        <p className="max-w-md text-sm text-muted-foreground">
          Once you select a property, you'll be able to see all your expenses, bookings, and analytics.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold tracking-tight">Dashboard for {selectedProperty}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Properties"
          value="12"
          icon={Building}
          change="2"
          positive
        />
        <StatsCard
          title="Monthly Expenses"
          value="$4,550"
          icon={DollarSign}
          change="12%"
          positive={false}
        />
        <StatsCard
          title="Pending Payments"
          value="$2,650"
          icon={Phone}
          change="$850"
          positive={false}
        />
        <StatsCard
          title="Profit Margin"
          value="68%"
          icon={TrendingUp}
          change="5%"
          positive
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseChart />
        <RecentExpenses />
      </div>

      <PendingPayments />
    </motion.div>
  );
};

export default Dashboard;
