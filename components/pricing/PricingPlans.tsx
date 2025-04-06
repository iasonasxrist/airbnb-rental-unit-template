
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    id: "hobby",
    name: "Hobby",
    price: "$9",
    description: "Perfect for small-scale hosts with 1-2 properties",
    features: [
      "Manage up to 2 properties",
      "Basic expense tracking",
      "Manual booking management",
      "Monthly financial reports",
      "Email support",
    ],
    stripeProductId: "price_hobby123",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "$29",
    description: "Ideal for growing hosts with multiple properties",
    features: [
      "Manage up to 10 properties",
      "Advanced expense categorization",
      "Automated booking syncing",
      "Weekly performance reports",
      "Priority email support",
      "Guest messaging templates",
      "Maintenance scheduling",
    ],
    stripeProductId: "price_pro123",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: "$79",
    description: "For professional hosts and property managers",
    features: [
      "Unlimited properties",
      "Complete financial tracking",
      "Team member accounts",
      "Advanced analytics & reports",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 priority support",
    ],
    stripeProductId: "price_business123",
    popular: false,
  },
];

export function PricingPlans() {
  const handleSubscribe = (planId: string, productId: string) => {
    console.log(`Subscribing to ${planId} plan with Stripe product ID: ${productId}`);
    // In a real implementation, this would redirect to a Stripe checkout session
    alert(`This would connect to Stripe for the ${planId} plan. Product ID: ${productId}`);
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <div 
          key={plan.id}
          className={`flex flex-col justify-between rounded-lg overflow-hidden border p-6 ${
            plan.popular 
              ? "border-primary shadow-md ring-2 ring-primary" 
              : "border-gray-200"
          }`}
        >
          {plan.popular && (
            <div className="absolute -translate-y-6 -translate-x-6 bg-primary px-3 py-1 text-xs font-medium text-white rounded-br-lg">
              Most Popular
            </div>
          )}
          
          <div>
            <h3 className={`text-lg font-bold ${plan.popular ? "text-primary" : ""}`}>
              {plan.name}
            </h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="ml-1 text-gray-500">/month</span>
            </div>
            <p className="mt-2 text-gray-600 text-sm">{plan.description}</p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={() => handleSubscribe(plan.id, plan.stripeProductId)}
            className={`mt-8 w-full ${
              plan.popular ? "" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            Get Started
          </Button>
        </div>
      ))}
    </div>
  );
}
