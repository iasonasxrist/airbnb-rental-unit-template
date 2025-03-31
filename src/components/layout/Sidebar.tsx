
import { Home, DollarSign, Building, Phone, Calendar, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building },
    { name: "Expenses", href: "/expenses", icon: DollarSign },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Pending Payments", href: "/pending-payments", icon: Phone },
    { name: "Reports", href: "/reports", icon: BarChart },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar flex flex-col border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center border-b border-sidebar-border h-16">
        {!collapsed && (
          <span className="text-xl font-bold text-airbnb-primary">
            AirCost
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed ? "justify-center" : ""
            )}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
