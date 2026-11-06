import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getServices();
        if (res?.services) setServices(res.services);
      } catch (e) {
        console.warn('Failed loading services');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Disciplines & Capabilities
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Comprehensive Architecture & Residential Interior Services
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            From initial structural space planning to turnkey modular millwork and lighting design across Zirakpur, Chandigarh, and Mohali.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div
                key={svc.slug}
                className="bg-white border border-studio-border overflow-hidden hover:border-studio-charcoal/60 transition-all duration-300 flex flex-col justify-between group"
              >
                {svc.coverImage && (
                  <div className="aspect-[16/10] bg-studio-stone overflow-hidden border-b border-studio-border">
                    <img
                      src={svc.coverImage}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-studio-teal font-semibold block mb-1">
                      Discipline {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors">
                      <Link to={`/services/${svc.slug}`}>{svc.title}</Link>
                    </h3>
                    <p className="text-xs text-studio-muted leading-relaxed mt-3">
                      {svc.shortDescription}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-studio-border/60 flex items-center justify-between">
                    <Link
                      to={`/services/${svc.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors"
                    >
                      <span>Explore Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to="/calculator"
                      className="text-[11px] uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
                    >
                      Estimate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-20 bg-studio-soft border-t border-studio-border text-center px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-serif font-light text-studio-charcoal">
            Need a Tailored Interior Solution for Your Home?
          </h2>
          <p className="text-sm text-studio-muted">
            Our architectural team is available to review your floor plans and provide realistic cost estimations.
          </p>
          <div className="pt-2">
            <Link
              to="/calculator"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all"
            >
              <span>Calculate Square Feet Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
