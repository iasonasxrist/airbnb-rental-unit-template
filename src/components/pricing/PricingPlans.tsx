
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function PricingPlans() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = (planName: string) => {
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
      });
      navigate("/sign-in");
      return;
    }

    toast({
      title: "Coming Soon",
      description: `Stripe integration for the ${planName} plan will be available soon!`,
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Basic Plan */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">Basic</CardTitle>
          <CardDescription>For individual property owners</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 flex-1">
          <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Up to 3 properties</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Basic expense tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Booking calendar</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Email support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSubscribe("Basic")}>
            Subscribe
          </Button>
        </CardFooter>
      </Card>

      {/* Pro Plan */}
      <Card className="flex flex-col border-primary">
        <CardHeader className="bg-primary/10 rounded-t-lg">
          <div className="text-sm font-semibold text-primary uppercase mb-2">Most Popular</div>
          <CardTitle className="text-xl">Pro</CardTitle>
          <CardDescription>For professional hosts</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 flex-1 pt-6">
          <div className="text-3xl font-bold">$24.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Up to 10 properties</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Advanced expense tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Booking management with reminders</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Financial reports</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Priority support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSubscribe("Pro")}>
            Subscribe
          </Button>
        </CardFooter>
      </Card>

      {/* Enterprise Plan */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">Enterprise</CardTitle>
          <CardDescription>For property management companies</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 flex-1">
          <div className="text-3xl font-bold">$49.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          <ul className="grid gap-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Unlimited properties</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Full financial management</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Advanced analytics and reporting</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Team access controls</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>API access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-primary flex-shrink-0" />
              <span>24/7 dedicated support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSubscribe("Enterprise")}>
            Subscribe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
