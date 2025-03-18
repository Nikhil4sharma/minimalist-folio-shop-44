
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">CardCraft</h3>
            <p className="text-gray-300 text-sm">Premium business cards for professionals who want to make a lasting impression.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-cyan transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-cyan transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-cyan transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-cyan transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-cyan transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/customize" className="text-gray-300 hover:text-cyan transition-colors">Customize</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-cyan transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-cyan transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-cyan transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-cyan transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-cyan transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-cyan transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <span>info@cardcraft.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>123 Business Ave, Suite 100, New York, NY 10001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CardCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
