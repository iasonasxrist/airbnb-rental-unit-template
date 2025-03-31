
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BellIcon, LogOut, UserCircle, Settings } from "lucide-react";
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

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    // In a real app, this would call an auth service logout method
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Navigate to landing page after logout
    navigate("/");
  };

  return (
    <header className="h-16 border-b flex items-center justify-between px-4 md:px-6">
      <h1 className="text-xl font-semibold md:hidden">AirCost</h1>
      <div className="flex-1" />
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toast({
              title: "Notifications",
              description: "No new notifications",
            });
          }}
        >
          <BellIcon className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
