import React from 'react';
import { Mail, Phone, MapPin, Globe  } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 py-10 px-4 sm:px-6 lg:px-8 mt-auto border-noneshadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2 inline-block border-b-2 border-purple-300">QuoteLKaro</h3>
          <p className="text-sm text-gray-600">
            Your trusted partner for creating professional and accurate estimates.
            Streamline your business with our intuitive platform.
          </p>
          <div className="flex space-x-4">
            {/* Placeholder for social media icons - changed colors to fit theme */}
            <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            {/* <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
              </a> */}
            
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className=" text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2 inline-block border-b-2 border-purple-300">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about-us" className="hover:text-purple-600 transition-colors text-sm text-gray-600">About Us</a></li>
            {/* <li><a href="/features" className="hover:text-purple-600 transition-colors text-sm text-gray-600">Features</a></li> */}
            <li><Link to="/plan-credits" className="hover:text-purple-600 transition-colors text-sm text-gray-600">Pricing</Link></li>
            {/* <li><a href="/faq" className="hover:text-purple-600 transition-colors text-sm text-gray-600">FAQ</a></li> */}
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-4">
          <h3 className=" text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2 inline-block border-b-2 border-purple-300">Policies</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-purple-600 transition-colors text-sm text-gray-600">Privacy Policy</a></li>
            <li><a href="/terms-conditions" className="hover:text-purple-600 transition-colors text-sm text-gray-600">Terms & Conditions</a></li>
            <li><a href="/return-refund-policy" className="hover:text-purple-600 transition-colors text-sm text-gray-600">Return & Refund Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4  ">
          <h3 className=" text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 pb-2 inline-block border-b-2 border-purple-300">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <Mail size={16} className="mr-2 text-purple-500 flex-shrink-0" />
              <a href="mailto:quotekaro.official@gmail.com" className="hover:text-purple-600 transition-colors text-gray-600">quotekaro.official@gmail.com</a>
            </li>
            <li className="flex items-center">
              <Phone size={16} className="mr-2 text-purple-500 flex-shrink-0" />
              <a href="tel:+917877571101" className="hover:text-purple-600 transition-colors text-gray-600">+91 7877571101</a>
            </li>
            <li className="flex items-start">
              <MapPin size={16} className="mr-2 mt-1 text-purple-500 flex-shrink-0" />
              <span className="text-gray-600">3v/1 Prabhat Nagar, Udaipur, Rajasthan, India </span>
            </li>
            {/* <li className="flex items-center">
              <Globe size={16} className="mr-2 text-purple-500 flex-shrink-0" />
              <a href="http://www.quotelkaro.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors text-gray-600">www.quotelkaro.com</a>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 mt-8 pt-2 text-center text-gray-500 text-sm">
        &copy; {currentYear} QuoteLKaro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
