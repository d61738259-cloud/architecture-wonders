import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  CheckCircle,
  Building,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            About Our Studio
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Where Thoughtful Architecture Meets Enduring Interior Craft
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Founded in 2023 in Zirakpur, Architecture Wonders is dedicated to shaping refined residential sanctuaries across the tri-city region.
          </p>
        </div>
      </section>

      {/* Studio Story & Verified Facts */}
      <section className="py-24 border-b border-studio-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
              Our Inception
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light">
              Architectural Rigour in Every Residential Square Foot
            </h2>
            <div className="w-12 h-0.5 bg-studio-teal" />
            <div className="space-y-4 text-sm text-studio-muted leading-relaxed font-light">
              <p>
                Architecture Wonders began with a clear purpose: to bridge the divide between grand architectural vision and real-world residential execution. Headquartered at Star City Business Plaza on VIP Road in Zirakpur, our studio has rapidly grown to complete over <strong className="text-studio-charcoal font-semibold">50+ residential home interior projects</strong> across Zirakpur, Chandigarh, and Mohali.
              </p>
              <p>
                We operate on the premise that true luxury does not reside in superficial gold finishes or gaudy ornament. Instead, it is found in the serenity of balanced light, the natural warmth of unhurried materials, and joinery that operates silently and flawlessly for decades.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-studio-stone border border-studio-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85"
                alt="Architecture Wonders Studio Aesthetic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Benchmarks */}
      <section className="py-20 bg-studio-soft border-b border-studio-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-studio-border space-y-3">
            <span className="text-4xl font-serif font-bold text-studio-charcoal">50+</span>
            <h3 className="text-base font-serif font-semibold text-studio-charcoal">
              Completed Home Interiors
            </h3>
            <p className="text-xs text-studio-muted leading-relaxed">
              Every project is an actual residential property delivered to delighted homeowners across Zirakpur, Chandigarh, and Mohali.
            </p>
          </div>

          <div className="p-8 bg-white border border-studio-border space-y-3">
            <span className="text-4xl font-serif font-bold text-studio-teal">2023</span>
            <h3 className="text-base font-serif font-semibold text-studio-charcoal">
              Studio Established
            </h3>
            <p className="text-xs text-studio-muted leading-relaxed">
              Founded on VIP Road, Zirakpur, with modern design facilities and dedicated site engineering teams.
            </p>
          </div>

          <div className="p-8 bg-white border border-studio-border space-y-3">
            <span className="text-4xl font-serif font-bold text-studio-charcoal">100%</span>
            <h3 className="text-base font-serif font-semibold text-studio-charcoal">
              Transparent Engineering
            </h3>
            <p className="text-xs text-studio-muted leading-relaxed">
              Detailed itemized bills of quantities (BOQ), verified timber certifications, and zero hidden price escalation.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-24 border-b border-studio-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
              Design Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
              The Principles That Guide Every Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-studio-teal font-semibold">
                01 · Spatial Purity
              </span>
              <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                Proportion Over Clutter
              </h3>
              <p className="text-xs text-studio-muted leading-relaxed">
                We design circulation corridors, window alignments, and ceiling heights to ensure natural airflow and ample daylight throughout every room.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-studio-teal font-semibold">
                02 · Tactile Materiality
              </span>
              <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                Natural Stone & Authentic Timber
              </h3>
              <p className="text-xs text-studio-muted leading-relaxed">
                From honed Indian limestones and Italian marbles to warm oak and walnut veneers, we curate materials that age gracefully over time.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-studio-teal font-semibold">
                03 · Technical Precision
              </span>
              <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                Flawless German Hardware & MEP
              </h3>
              <p className="text-xs text-studio-muted leading-relaxed">
                Quiet soft-close hinges, high load-bearing runners, anti-termite marine ply, and concealed electrical conduits executed to international standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-studio-soft px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif text-studio-charcoal font-light">
            Discuss Your Home Architecture with Our Principals
          </h2>
          <p className="text-sm text-studio-muted max-w-xl mx-auto">
            Visit our studio at Star City Business Plaza, VIP Road, Zirakpur, or start with our online cost estimator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/calculator"
              className="px-8 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all"
            >
              Estimate Project Cost
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white border border-studio-border text-studio-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-studio-soft transition-all"
            >
              Book Studio Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
