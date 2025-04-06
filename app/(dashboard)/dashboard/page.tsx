
import { Building, DollarSign, Phone, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { PendingPayments } from "@/components/dashboard/PendingPayments";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;
