"use client"; // Required for hooks like useUser

import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image"; // Import Image from next/image
import { useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Home,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// Assume 'airbnb-primary' is defined in your tailwind.config.js
// e.g., theme: { extend: { colors: { 'airbnb-primary': '#FF5A5F' } } }

export default function HomePage(){
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            {" "}
            {/* Use Link and href */}
            <span className="text-2xl font-bold text-airbnb-primary">
              AirCost
            </span>
          </Link>
          <div className="flex items-center space-x-2">
            <Link href="/pricing">
              {" "}
              {/* Use Link and href */}
              <Button variant="ghost">Pricing</Button>
            </Link>
            {isSignedIn ? (
              <Link href="/dashboard">
                {" "}
                {/* Use Link and href */}
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in">
                  {" "}
                  {/* Use Link and href */}
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  {" "}
                  {/* Use Link and href */}
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Manage Your Airbnb Properties{" "}
              <span className="text-airbnb-primary">Effortlessly</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Track expenses, bookings, and profits all in one place. Never miss
              a payment or maintenance task again.
            </p>
            {isSignedIn ? (
              <Link href="/dashboard">
                {" "}
                {/* Use Link and href */}
                <Button size="lg" className="gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/sign-up">
                  {" "}
                  {/* Use Link and href */}
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Start For Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  {" "}
                  {/* Use Link and href */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            {/* Use next/image */}
            <Image
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Modern house exterior representing a vacation property"
              width={800} // Provide width
              height={533} // Provide height (estimate aspect ratio)
              className="rounded-lg shadow-xl mx-auto"
              priority // Load this image eagerly as it's likely above the fold
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Manage Your Properties
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Item */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              {/* Ensure 'text-primary' matches your Tailwind config */}
              <Home className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Property Management
              </h3>
              <p className="text-gray-600">
                Add and manage all your rental properties in one central
                location.
              </p>
            </div>
            {/* Repeat for other features... */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <DollarSign className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
              <p className="text-gray-600">
                Track all expenses and categorize them for better financial
                management.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <Calendar className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Booking Calendar</h3>
              <p className="text-gray-600">
                Visualize bookings and availability for all your properties.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <LineChart className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financial Reports</h3>
              <p className="text-gray-600">
                Generate detailed reports about income, expenses, and
                profitability.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <ShieldCheck className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Keep your data safe with our secure authentication system
                powered by Clerk.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <Sparkles className="h-10 w-10 text-airbnb-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Automated Notifications
              </h3>
              <p className="text-gray-600">
                Get notified about upcoming bookings and maintenance tasks
                (coming soon!).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* Ensure 'bg-primary' matches your Tailwind config */}
      <section className="py-16 bg-airbnb-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to simplify your property management?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of property owners who have streamlined their Airbnb
            business with AirCost.
          </p>
          {isSignedIn ? (
            <Link href="/dashboard">
              {" "}
              {/* Use Link and href */}
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-airbnb-primary hover:bg-gray-100"
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/sign-up">
                {" "}
                {/* Use Link and href */}
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-airbnb-primary hover:bg-gray-100"
                >
                  Create Your Free Account
                </Button>
              </Link>
              <Link href="/pricing">
                {" "}
                {/* Use Link and href */}
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-auto">
        {" "}
        {/* mt-auto pushes footer down */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <Link href="/">
                <span className="text-xl font-bold text-airbnb-primary">
                  AirCost
                </span>
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                © {new Date().getFullYear()} AirCost. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Pricing
              </Link>
              {/* Replace # with actual paths once created */}
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

