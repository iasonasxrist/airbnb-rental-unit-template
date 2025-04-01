
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BellIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { PropertySelector } from "../property/PropertySelector";
import { useProperty } from "@/contexts/PropertyContext";

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { hasSelectedProperty } = useProperty();
  
  // Rate limiter for notifications
  const [lastNotificationTime, setLastNotificationTime] = useState(0);
  const NOTIFICATION_COOLDOWN = 30000; // 30 seconds

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      await signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNotificationClick = () => {
    const now = Date.now();
    if (now - lastNotificationTime < NOTIFICATION_COOLDOWN) {
      return;
    }
    
    setLastNotificationTime(now);
    toast({
      title: "Notifications",
      description: "No new notifications",
    });
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold mr-6 hidden md:block">AirCost</h1>
        <PropertySelector />
      </div>
      <h1 className="text-xl font-semibold md:hidden">AirCost</h1>
      <div className="flex items-center space-x-2 md:space-x-4">
        {hasSelectedProperty && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
          </Button>
        )}
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonBox: "h-9 w-9",
              userButtonAvatarBox: "h-full w-full",
            }
          }}
          fallback={
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          }
        />
      </div>
    </header>
  );
}
