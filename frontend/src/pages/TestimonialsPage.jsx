import React, { useEffect, useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getTestimonials();
        if (res?.testimonials) setTestimonials(res.testimonials);
      } catch (e) {
        console.warn('Failed loading testimonials');
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
            Client Perspectives
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Genuine Reflections from Homeowners We Have Served
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Every completed home interior is a reflection of trust, shared aesthetic vision, and diligent on-site execution.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="py-20 text-center text-sm text-studio-muted">
              Loading verified reviews...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t._id || t.clientName}
                  className="p-8 border border-studio-border bg-studio-soft/30 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1 text-studio-coral">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-studio-charcoal leading-relaxed font-serif italic">
                      "{t.reviewText}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-studio-border">
                    <span className="block text-sm font-semibold text-studio-charcoal">
                      {t.clientName}
                    </span>
                    <span className="text-xs text-studio-muted">
                      {t.projectTitle} · {t.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
