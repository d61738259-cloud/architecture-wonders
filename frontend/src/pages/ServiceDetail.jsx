import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.getServiceBySlug(slug);
        if (res?.service) setService(res.service);
      } catch (e) {
        console.warn('Failed loading service detail');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-sm text-studio-muted">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="text-2xl font-serif">Service Not Found</h2>
        <Link to="/services" className="text-xs uppercase tracking-wider text-studio-teal">
          Return to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Services</span>
          </Link>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-4xl">
            {service.title}
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-studio-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            {service.coverImage && (
              <div className="aspect-[16/9] bg-studio-stone border border-studio-border overflow-hidden">
                <img
                  src={service.coverImage}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-studio-charcoal">
                Architectural Approach & Methodology
              </h2>
              <div className="text-sm text-studio-muted leading-relaxed space-y-4 font-light">
                <p>{service.fullDescription}</p>
              </div>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-studio-border">
                <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                  Key Deliverables & Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-4 border border-studio-border bg-studio-soft/40 flex items-start space-x-3"
                    >
                      <Check className="w-4 h-4 text-studio-teal shrink-0 mt-0.5" />
                      <span className="text-xs text-studio-charcoal leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design Considerations */}
            {service.designConsiderations && service.designConsiderations.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-studio-border">
                <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                  Technical & Design Considerations
                </h3>
                <ul className="space-y-2 text-xs text-studio-muted">
                  {service.designConsiderations.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-studio-teal font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-studio-border">
                <h3 className="text-2xl font-serif font-semibold text-studio-charcoal">
                  Frequently Asked Questions
                </h3>
                <div className="divide-y divide-studio-border border border-studio-border">
                  {service.faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i} className="bg-white">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? -1 : i)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                        >
                          <span className="text-sm font-semibold text-studio-charcoal">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-studio-muted transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-studio-teal' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 text-xs text-studio-muted leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Consultation Box */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-8 border border-studio-border bg-studio-soft space-y-6">
              <span className="text-[11px] uppercase tracking-widest text-studio-teal font-semibold block">
                Direct Studio Consultation
              </span>
              <h3 className="text-2xl font-serif font-semibold text-studio-charcoal">
                Enquire About {service.title}
              </h3>
              <p className="text-xs text-studio-muted leading-relaxed">
                Connect with our lead architects to discuss blueprints, material schedules, and timeline estimations for your property in Zirakpur, Chandigarh, or Mohali.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/916280609005?text=${encodeURIComponent(
                    `Hello Architecture Wonders! I would like to enquire about your ${service.title} services for my residential property.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-studio-teal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-tealDark transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <Link
                  to="/calculator"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-all"
                >
                  <span>Estimate Project Cost</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+916280609005"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 border border-studio-border bg-white text-studio-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-studio-stone transition-all"
                >
                  <Phone className="w-4 h-4 text-studio-teal" />
                  <span>Call +91 6280 609 005</span>
                </a>
              </div>

              <div className="pt-4 border-t border-studio-border text-[11px] text-studio-muted space-y-1.5">
                <p className="font-semibold text-studio-charcoal">Studio Visit:</p>
                <p>Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Zirakpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
