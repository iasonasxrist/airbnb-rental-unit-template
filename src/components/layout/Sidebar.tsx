
import { Home, DollarSign, Building, Phone, Calendar, BarChart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useProperty } from "@/contexts/PropertyContext";
import { motion } from "framer-motion";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { selectedProperty } = useProperty();
  const showNavigation = selectedProperty !== "all";

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  // Close mobile menu on navigation
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Properties", href: "/properties", icon: Building },
    { name: "Expenses", href: "/expenses", icon: DollarSign },
    { name: "Bookings", href: "/bookings", icon: Calendar },
    { name: "Pending Payments", href: "/pending-payments", icon: Phone },
    { name: "Reports", href: "/reports", icon: BarChart },
  ];

  // On extremely small screens, use a drawer menu
  if (isMobile && window.innerWidth < 640) {
    return (
      <>
        <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed left-4 top-4 z-40 md:hidden"
              aria-label="Menu"
            >
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
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="h-full flex flex-col bg-sidebar">
              <div className="p-4 flex items-center border-b border-sidebar-border h-16">
                <span 
                  className="text-xl font-bold text-airbnb-primary cursor-pointer" 
                  onClick={() => {
                    navigate("/");
                    setShowMobileMenu(false);
                  }}
                >
                  AirCost
                </span>
              </div>
              <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {showNavigation ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, staggerChildren: 0.1 }}
                    className="space-y-1"
                  >
                    {navigation.map((item) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors",
                            location.pathname === item.href
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <item.icon className="h-5 w-5 mr-3" />
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="px-3 py-8 text-center text-sidebar-foreground/70">
                    <p className="mb-2">Please select a property</p>
                    <p className="text-xs">Navigation will appear here after selection</p>
                  </div>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // For larger screens
  return (
    <div
      className={cn(
        "bg-sidebar flex flex-col border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center border-b border-sidebar-border h-16">
        {!collapsed && (
          <span 
            className="text-xl font-bold text-airbnb-primary cursor-pointer" 
            onClick={() => navigate("/")}
          >
            AirCost
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
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
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {showNavigation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            className="space-y-1"
          >
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
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
                  aria-label={item.name}
                  title={collapsed ? item.name : ""}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className={cn(
            "text-center text-sidebar-foreground/70 py-6",
            collapsed ? "px-1" : "px-3"
          )}>
            {!collapsed ? (
              <>
                <p className="mb-2">Please select a property</p>
                <p className="text-xs">Navigation will appear after selection</p>
              </>
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
                className="mx-auto text-sidebar-foreground/50"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
