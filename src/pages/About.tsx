import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Award, Car, Shield, Truck, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Badge className="bg-blue-600 hover:bg-blue-600 mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            About AutoHive
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Your trusted partner in finding the perfect vehicle for your journey
          </p>
        </div>
        <svg
          className="absolute bottom-0 w-full h-16 text-gray-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            fill="currentColor"
            d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H0V22Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg mx-auto">
          <Card className="mb-12 border-none shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to AutoHive, your one-stop destination for finding and
                purchasing your dream car online. We are passionate about
                providing a seamless and enjoyable car buying experience for our
                customers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Our mission is to revolutionize the way people buy cars by
                offering a wide selection of high-quality vehicles, competitive
                prices, and exceptional customer service. We understand that
                buying a car is a significant decision, and we're here to make
                that process as smooth and transparent as possible.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Us Section */}
          <div className="my-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Why Choose AutoHive?
            </h2>
            <Separator className="mx-auto w-24 h-1 bg-blue-600 mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Car className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Extensive Inventory
                  </h3>
                  <p className="text-gray-600">
                    New and used cars from top manufacturers with detailed
                    specifications
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Secure Transactions
                  </h3>
                  <p className="text-gray-600">
                    Safe and secure online payment options protecting your
                    information
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                  <p className="text-gray-600">
                    Automotive experts ready to assist with your purchasing
                    decisions
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Hassle-free Delivery
                  </h3>
                  <p className="text-gray-600">
                    Convenient delivery options right to your doorstep
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Competitive Pricing
                  </h3>
                  <p className="text-gray-600">
                    Best deals and special offers to ensure maximum value
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Fast Processing
                  </h3>
                  <p className="text-gray-600">
                    Quick approval process and minimal paperwork for a seamless
                    experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Commitment Section */}
          <Card className="border border-blue-100 bg-blue-50 my-12">
            <CardHeader>
              <h2 className="text-2xl font-bold text-blue-800">
                Our Commitment
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                At AutoHive, we're committed to providing you with the best
                online car buying experience. Our team of automotive experts is
                always ready to assist you in finding the perfect vehicle that
                meets your needs and budget.
              </p>
              <p className="text-gray-700 mt-4 font-medium">
                Thank you for choosing AutoHive. We look forward to helping you
                find your next dream car!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Browse our extensive collection and discover the perfect vehicle for
            your needs today.
          </p>
          <Link to="/products">
            <Button size="lg" className="px-8">
              Explore Vehicles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
