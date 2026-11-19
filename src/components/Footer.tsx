import { Link } from "react-router-dom";
import { Logo } from "./Header";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Fresh food from your favourite local restaurants, delivered hot to
            your door. Search by city, pick a cuisine, and order in minutes.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-white">Explore</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-brand-amber">Home</Link>
            </li>
            <li>
              <Link to="/order-status" className="hover:text-brand-amber">Track an order</Link>
            </li>
            <li>
              <Link to="/manage-restaurant" className="hover:text-brand-amber">List your restaurant</Link>
            </li>
            <li>
              <Link to="/user-profile" className="hover:text-brand-amber">My profile</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-white">Contact</h4>
          <ul className="space-y-2 text-white/60">
            <li className="flex items-center gap-2"><MapPin className="size-4 text-brand-amber" /> Lahore, Pakistan</li>
            <li className="flex items-center gap-2"><Phone className="size-4 text-brand-amber" /> +92 300 0000000</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-brand-amber" /> hello@merneats.com</li>
            <li className="flex items-center gap-2"><Clock className="size-4 text-brand-amber" /> Open daily 10am – 12am</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} MernEats. All rights reserved.</span>
          <span className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
