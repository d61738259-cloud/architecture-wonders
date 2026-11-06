import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import { MessageSquare } from 'lucide-react';

export default function MainLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-studio-charcoal selection:bg-studio-stone selection:text-studio-charcoal">
      <Preloader />
      <Navbar />

      <main className="flex-grow pt-[72px]">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Contextual WhatsApp Button */}
      <a
        href="https://wa.me/916280609005"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="fixed bottom-6 right-6 z-40 bg-studio-teal text-white p-3.5 rounded-full shadow-elevated hover:bg-studio-tealDark hover:scale-105 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out px-0 group-hover:px-2 text-xs font-semibold tracking-wide">
          Enquire on WhatsApp
        </span>
      </a>
    </div>
  );
}
