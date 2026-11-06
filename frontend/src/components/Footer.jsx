import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-studio-soft border-t border-studio-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Studio Brand & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Architecture Wonders"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-studio-muted leading-relaxed max-w-sm">
              Architecture Wonders is a modern editorial architecture and interior design studio established in 2023. We bring verified expertise of 50+ completed residential home interior projects across Zirakpur, Chandigarh, and Mohali.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/architecturewonders05/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-charcoal hover:text-studio-teal transition-colors"
              >
                <Instagram className="w-4 h-4 text-studio-teal" />
                <span>@architecturewonders05</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Studio Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-studio-charcoal mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-studio-muted">
              <li>
                <Link to="/" className="hover:text-studio-charcoal transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-studio-charcoal transition-colors">About Our Studio</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-studio-charcoal transition-colors">Featured Projects</Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-studio-charcoal transition-colors">Our Design Process</Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-studio-charcoal transition-colors">Cost Calculator</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-studio-charcoal transition-colors">Client Testimonials</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-studio-charcoal transition-colors">Design Insights</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-studio-charcoal transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-studio-charcoal mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm text-studio-muted">
              <li>
                <Link to="/services/complete-home-interior-design" className="hover:text-studio-charcoal transition-colors">Complete Home Interiors</Link>
              </li>
              <li>
                <Link to="/services/residential-architecture" className="hover:text-studio-charcoal transition-colors">Residential Architecture</Link>
              </li>
              <li>
                <Link to="/services/modular-kitchen-design" className="hover:text-studio-charcoal transition-colors">Modular Kitchens</Link>
              </li>
              <li>
                <Link to="/services/wardrobes-storage-solutions" className="hover:text-studio-charcoal transition-colors">Wardrobes & Storage</Link>
              </li>
              <li>
                <Link to="/services/living-room-design" className="hover:text-studio-charcoal transition-colors">Living Room Design</Link>
              </li>
              <li>
                <Link to="/services/false-ceiling-lighting" className="hover:text-studio-charcoal transition-colors">False Ceiling & Lighting</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Contact & Address */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-studio-charcoal mb-4">
              Studio Address
            </h4>
            <div className="space-y-3.5 text-sm text-studio-muted">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-studio-teal shrink-0 mt-0.5" />
                <span>Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-studio-teal shrink-0" />
                <a href="tel:+916280609005" className="hover:text-studio-charcoal transition-colors">+91 6280 609 005</a>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-studio-teal shrink-0" />
                <a href="mailto:architecturewonders05@gmail.com" className="hover:text-studio-charcoal transition-colors">architecturewonders05@gmail.com</a>
              </p>
              <div className="pt-2">
                <a
                  href="https://www.google.co.in/maps/place/Star+City+Business+Plaza,+Vip+Road+Zirakpur+Distt.+SAS+Nagar(Mohali)/@30.639488,76.8138192,17z/data=!3m1!4b1!4m6!3m5!1s0x390feb8a815f974f:0x50be1e51f848b644!8m2!3d30.639488!4d76.8163941!16s%2Fg%2F11v_26gqqg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-studio-teal hover:underline space-x-1"
                >
                  <span>Get Directions on Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-studio-border/70 flex flex-col sm:flex-row items-center justify-between text-xs text-studio-muted space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Architecture Wonders. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Verified 50+ Home Interiors in Zirakpur, Chandigarh & Mohali</span>
            <Link to="/admin/login" className="hover:text-studio-charcoal text-[11px] opacity-75">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
