import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { mobileMenuVariant } from '../animations/variants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Process', path: '/process' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-studio-border py-3'
            : 'bg-white/80 backdrop-blur-sm border-b border-studio-border/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Business Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Architecture Wonders Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs tracking-widest uppercase transition-colors py-1 ${
                    isActive(link.path)
                      ? 'text-studio-charcoal font-semibold'
                      : 'text-studio-muted hover:text-studio-charcoal'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-studio-teal"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://wa.me/916280609005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-studio-muted hover:text-studio-teal transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <Link
                to="/calculator"
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-none border border-studio-charcoal bg-studio-charcoal text-white hover:bg-studio-teal hover:border-studio-teal transition-all duration-300"
              >
                <span>Calculate Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                to="/calculator"
                className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 border border-studio-charcoal text-studio-charcoal"
              >
                Estimate
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-studio-charcoal focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-out Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={mobileMenuVariant}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-[60px] z-40 bg-white flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
          >
            <div className="space-y-4 pt-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 text-xl font-serif tracking-wide border-b border-studio-border/50 ${
                      isActive(link.path)
                        ? 'text-studio-teal font-semibold'
                        : 'text-studio-charcoal'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-studio-border space-y-4">
              <div className="text-xs text-studio-muted">
                <p className="font-semibold text-studio-charcoal">Studio Location</p>
                <p>Star City Business Plaza, VIP Road, Zirakpur</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+916280609005"
                  className="flex items-center justify-center space-x-2 py-3 border border-studio-border text-xs uppercase tracking-wider font-medium text-studio-charcoal hover:bg-studio-soft"
                >
                  <Phone className="w-3.5 h-3.5 text-studio-teal" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/916280609005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 py-3 bg-studio-teal text-white text-xs uppercase tracking-wider font-medium hover:bg-studio-tealDark"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
