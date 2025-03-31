
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Calendar, DollarSign, Home, LineChart, ShieldCheck, Sparkles } from "lucide-react";

const Index = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-airbnb-primary">AirCost</span>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Manage Your Airbnb Properties <span className="text-airbnb-primary">Effortlessly</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Track expenses, bookings, and profits all in one place. 
              Never miss a payment or maintenance task again.
            </p>
            {isSignedIn ? (
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/sign-up">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Start For Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Vacation property management" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Manage Your Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <Home className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Property Management</h3>
              <p className="text-gray-600">
                Add and manage all your rental properties in one central location.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <DollarSign className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-gray-600">
                Track all expenses and categorize them for better financial management.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <Calendar className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Booking Calendar</h3>
              <p className="text-gray-600">
                Visualize bookings and availability for all your properties.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <LineChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financial Reports</h3>
              <p className="text-gray-600">
                Generate detailed reports about income, expenses, and profitability.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <ShieldCheck className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Keep your data safe with our secure authentication system.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <Sparkles className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automated Notifications</h3>
              <p className="text-gray-600">
                Get notified about upcoming bookings and maintenance tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to simplify your property management?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who have streamlined their Airbnb business with AirCost.
          </p>
          {isSignedIn ? (
            <Link to="/dashboard">
              <Button size="lg" variant="secondary">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" variant="secondary">
                  Create Your Free Account
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-airbnb-primary">AirCost</span>
              <p className="text-sm text-gray-600 mt-1">© {new Date().getFullYear()} AirCost. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
