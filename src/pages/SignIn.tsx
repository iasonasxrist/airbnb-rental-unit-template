
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-airbnb-primary">AirCost</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none p-0",
                navbar: "hidden",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-500",
                formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                footerAction: "text-sm font-medium text-primary hover:text-primary/80",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
