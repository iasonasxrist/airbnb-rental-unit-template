
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-airbnb-primary/10 to-airbnb-secondary/10 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 lg:space-y-6 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-airbnb-primary">
                Manage Your Airbnb Properties with Ease
              </h1>
              <p className="text-lg text-gray-600 max-w-[700px]">
                Track expenses, manage bookings, and monitor your cash flow all in one place. AirCost is your perfect companion for Airbnb hosts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-airbnb-primary hover:bg-airbnb-primary/90"
                  onClick={() => navigate("/dashboard")}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/properties")}
                >
                  View Properties
                </Button>
              </div>
            </div>
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="rounded-2xl bg-white shadow-xl p-4 md:p-6">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Beautiful Airbnb property" 
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-airbnb-primary">97%</p>
                    <p className="text-sm text-gray-500">Occupancy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-airbnb-primary">$2,450</p>
                    <p className="text-sm text-gray-500">Avg. Monthly</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-airbnb-primary">68%</p>
                    <p className="text-sm text-gray-500">Profit Margin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Everything You Need to Manage Your Properties</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path><path d="M12 7v.01"></path><rect x="3" y="17" width="18" height="4" rx="1"></rect></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Management</h3>
              <p className="text-gray-600">Keep track of all your properties in one place with detailed information and statistics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Booking Calendar</h3>
              <p className="text-gray-600">Manage all your bookings with an intuitive calendar interface and automatic reminders.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-gray-600">Track and categorize all your property-related expenses to maximize tax deductions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-gray-600">Get insights into your property performance with detailed charts and reports.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><path d="M3 3h18v18H3z"></path><path d="m16 16-4-4-4 4"></path><path d="M8 8v.01"></path><path d="M12 8v.01"></path><path d="M16 8v.01"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Payment Tracking</h3>
              <p className="text-gray-600">Keep track of all pending and received payments from your guests.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-airbnb-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-airbnb-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Notifications</h3>
              <p className="text-gray-600">Get automated email notifications for upcoming bookings and important events.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to streamline your Airbnb management?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of hosts who use AirCost to simplify their property management.
          </p>
          <Button 
            size="lg" 
            className="bg-airbnb-primary hover:bg-airbnb-primary/90"
            onClick={() => navigate("/dashboard")}
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
