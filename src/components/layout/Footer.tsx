import { Link } from "react-router-dom";
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl tracking-wide text-gradient-gold">
                NUTRIHUB
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fuel your fitness journey with premium supplements. Quality ingredients, proven results.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="hover:text-primary">
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Shop All", "Best Sellers", "New Arrivals", "Sale", "Blog"].map((link) => (
                <li key={link}>
                  <Link
                    to="/shop"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-xl mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Whey Protein", "Pre-Workout", "BCAA", "Creatine", "Vitamins", "Mass Gainer"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      to="/shop"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                support@nutrihub.com
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                1-800-NUTRIHUB
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                123 Fitness Blvd, Muscle City, MC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 NutriHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Shipping Info"].map((link) => (
              <Link
                key={link}
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
