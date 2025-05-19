import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/const";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background text-secondary-foreground">
      <div className="container py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-20" src="/logo.png" alt="AutoHive" />
            </Link>
            <p className="text-secondary-foreground/75 text-sm">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">
              Quick Links
            </h3>
            <Separator className="my-2" />
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  Home
                </span>
              </Link>
              <Link to="/products" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  Products
                </span>
              </Link>
              <Link to="/about" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  About
                </span>
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">
              Support
            </h3>
            <Separator className="my-2" />
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  Contact Us
                </span>
              </a>
              <a href="#" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  FAQ
                </span>
              </a>
              <a href="#" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  Terms of Service
                </span>
              </a>
              <a href="#" className="text-sm group flex items-center">
                <span className="hover:text-primary transition-colors flex items-center">
                  <span className="opacity-0 transition-all group-hover:opacity-100 group-hover:mr-1">
                    ›
                  </span>{" "}
                  Privacy Policy
                </span>
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary">
              Contact Us
            </h3>
            <Separator className="my-2" />
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm group">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="group-hover:text-primary transition-colors">
                  123 Car Street, Automobile City, AC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm group">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="group-hover:text-primary transition-colors">
                  (123) 456-7890
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm group">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="group-hover:text-primary transition-colors">
                  support@{SITE_TITLE.toLowerCase().replace(" ", "")}.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_TITLE}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
