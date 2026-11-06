import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Instagram,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { api } from '../services/api';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('project'); // 'project' or 'general'
  const [submitting, setSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    propertyType: 'Residential Apartment',
    propertyLocation: 'Zirakpur',
    propertyAreaSqFt: '',
    serviceRequired: 'Complete Home Interior Design',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessInfo(null);

    if (!formData.name || !formData.phone || !formData.email) {
      setErrorMsg('Please complete your name, phone number, and email.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        enquiryType: activeTab === 'project' ? 'project_enquiry' : 'general_contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        propertyType: activeTab === 'project' ? formData.propertyType : '',
        propertyLocation: activeTab === 'project' ? formData.propertyLocation : '',
        propertyAreaSqFt: activeTab === 'project' && formData.propertyAreaSqFt ? Number(formData.propertyAreaSqFt) : 0,
        serviceRequired: activeTab === 'project' ? formData.serviceRequired : '',
      };

      const res = await api.submitEnquiry(payload);
      if (res.success) {
        setSuccessInfo({
          referenceNumber: res.referenceNumber,
          message: res.message,
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          propertyType: 'Residential Apartment',
          propertyLocation: 'Zirakpur',
          propertyAreaSqFt: '',
          serviceRequired: 'Complete Home Interior Design',
        });
      } else {
        setErrorMsg(res.message || 'Submission failed. Please call us directly.');
      }
    } catch (err) {
      setErrorMsg('Network error while transmitting enquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Connect With Us
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Initiate Your Architectural & Interior Design Consultation
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Visit our studio at Star City Business Plaza, VIP Road, Zirakpur, or submit your property details below for a prompt evaluation.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Business Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-studio-charcoal">
                Architecture Wonders
              </h2>
              <p className="text-xs uppercase tracking-widest text-studio-teal font-semibold mt-1">
                Architecture · Interiors · Space Planning
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">Studio Address</span>
                  <p className="text-xs text-studio-muted leading-relaxed mt-1">
                    Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">Telephone</span>
                  <a
                    href="tel:+916280609005"
                    className="text-xs text-studio-muted hover:text-studio-charcoal transition-colors mt-1 block"
                  >
                    +91 6280 609 005
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">WhatsApp Direct</span>
                  <a
                    href="https://wa.me/916280609005"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-studio-teal hover:underline mt-1 block"
                  >
                    +91 6280 609 005 (Chat with Principal Architect)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">Official Email</span>
                  <a
                    href="mailto:architecturewonders05@gmail.com"
                    className="text-xs text-studio-muted hover:text-studio-charcoal transition-colors mt-1 block"
                  >
                    architecturewonders05@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Instagram className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">Instagram Handle</span>
                  <a
                    href="https://www.instagram.com/architecturewonders05/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-studio-muted hover:text-studio-charcoal transition-colors mt-1 block"
                  >
                    @architecturewonders05
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-studio-teal shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-studio-charcoal block">Consultation Hours</span>
                  <p className="text-xs text-studio-muted mt-1">
                    Monday to Saturday: 10:00 AM – 7:30 PM (Prior appointment recommended)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/916280609005?text=Hello%20Architecture%20Wonders!%20I%20would%20like%20to%20schedule%20a%20design%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-studio-teal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-tealDark transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Message</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-studio-soft/40 border border-studio-border p-6 sm:p-10">
            {/* Form Mode Selector */}
            <div className="flex border-b border-studio-border mb-8">
              <button
                type="button"
                onClick={() => setActiveTab('project')}
                className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 mr-6 transition-all ${
                  activeTab === 'project'
                    ? 'border-studio-teal text-studio-teal font-bold'
                    : 'border-transparent text-studio-muted hover:text-studio-charcoal'
                }`}
              >
                Project Enquiry
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`pb-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all ${
                  activeTab === 'general'
                    ? 'border-studio-teal text-studio-teal font-bold'
                    : 'border-transparent text-studio-muted hover:text-studio-charcoal'
                }`}
              >
                General Consultation
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successInfo && (
              <div className="mb-6 p-5 bg-studio-tealLight border border-studio-teal text-studio-tealDark space-y-2">
                <div className="flex items-center space-x-2 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-studio-teal shrink-0" />
                  <span>Enquiry Successfully Logged!</span>
                </div>
                <p className="text-xs">
                  {successInfo.message} Reference ID: <strong className="font-mono">{successInfo.referenceNumber}</strong>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Amit Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                    Phone Number (+91) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                />
              </div>

              {activeTab === 'project' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                        Property Structure Type
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                      >
                        <option value="Residential Apartment">Residential Apartment</option>
                        <option value="Independent Villa / Kothi">Independent Villa / Kothi</option>
                        <option value="Duplex / Penthouse">Duplex / Penthouse</option>
                        <option value="Builder Floor">Builder Floor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                        Property Location (Tri-City)
                      </label>
                      <input
                        type="text"
                        name="propertyLocation"
                        placeholder="e.g. VIP Road, Zirakpur / Sec 82, Mohali"
                        value={formData.propertyLocation}
                        onChange={handleChange}
                        className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                        Approx. Area (Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        name="propertyAreaSqFt"
                        placeholder="e.g. 1850"
                        value={formData.propertyAreaSqFt}
                        onChange={handleChange}
                        className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                        Service Desired
                      </label>
                      <select
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                      >
                        <option value="Complete Home Interior Design">Complete Home Interior Design</option>
                        <option value="Residential Architecture">Residential Architecture</option>
                        <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                        <option value="Living Room & False Ceiling">Living Room & False Ceiling</option>
                        <option value="Renovation & Remodelling">Renovation & Remodelling</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
                  Message / Project Requirements
                </label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Share details regarding your timeline, specific design preferences, or budget parameters..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-studio-border bg-white text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all duration-300 disabled:opacity-50"
                >
                  <span>{submitting ? 'Transmitting...' : 'Submit Enquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Embedded Google Maps Section */}
      <section className="border-t border-studio-border">
        <div className="w-full h-96 bg-studio-stone">
          <iframe
            title="Architecture Wonders Studio Location"
            src="https://maps.google.com/maps?q=Star%20City%20Business%20Plaza,%20Vip%20Road%20Zirakpur&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
