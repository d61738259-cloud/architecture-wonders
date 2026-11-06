import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center space-y-6">
        <span className="text-6xl sm:text-8xl font-serif font-light text-studio-stoneDark block">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif text-studio-charcoal">
          Page Beyond Blueprint
        </h1>
        <p className="text-xs sm:text-sm text-studio-muted leading-relaxed">
          The architectural route you requested does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
