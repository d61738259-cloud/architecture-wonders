import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  Check,
  Building,
  Home,
  Layers,
  Sparkles,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { api } from '../services/api';

export default function CostCalculator({ initialCategory = '3bhk' }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Configuration from backend
  const [settings, setSettings] = useState({
    baseRatePerSqFt: 1250,
    currencySymbol: '₹',
    minAreaSqFt: 300,
    maxAreaSqFt: 25000,
    propertyTypes: [
      'Luxury Residential Apartment',
      'Independent Villa / Kothi',
      'Duplex / Penthouse',
      'Builder Floor',
      'Studio Apartment',
    ],
    propertyCategories: [
      { id: '1bhk', label: '1 BHK', typicalAreaSqFt: 650, multiplier: 1.0 },
      { id: '2bhk', label: '2 BHK', typicalAreaSqFt: 1150, multiplier: 1.0 },
      { id: '3bhk', label: '3 BHK', typicalAreaSqFt: 1750, multiplier: 1.0 },
      { id: '4bhk', label: '4 BHK / 4+ BHK', typicalAreaSqFt: 2500, multiplier: 1.05 },
    ],
    disclaimerText:
      'This is an indicative estimate based on the information provided. Final pricing may vary depending on project requirements, material selections, design specifications and site conditions. Please contact Architecture Wonders for a detailed quotation.',
  });

  const [additionalServices, setAdditionalServices] = useState([]);

  // Form State
  const [areaSqFt, setAreaSqFt] = useState(1750);
  const [propertyCategory, setPropertyCategory] = useState(initialCategory);
  const [propertyType, setPropertyType] = useState('Luxury Residential Apartment');
  const [selectedServices, setSelectedServices] = useState([
    'modular-kitchen',
    'wardrobes-storage',
    'false-ceiling-lighting',
  ]);

  // Lead details
  const [lead, setLead] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  // Server-calculated estimate
  const [estimate, setEstimate] = useState(null);

  // Fetch live settings on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        setLoading(true);
        const data = await api.getCalculatorSettings();
        if (data && data.success) {
          if (data.settings) setSettings(data.settings);
          if (data.additionalServices && data.additionalServices.length > 0) {
            setAdditionalServices(data.additionalServices);
            const defaults = data.additionalServices
              .filter((s) => s.isDefaultSelected)
              .map((s) => s.slug);
            if (defaults.length > 0) setSelectedServices(defaults);
          }
        }
      } catch (err) {
        console.warn('Using default calculator rates');
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Update area when BHK changes to typical size
  const handleCategoryChange = (catId) => {
    setPropertyCategory(catId);
    const cat = settings.propertyCategories.find((c) => c.id === catId);
    if (cat && cat.typicalAreaSqFt) {
      setAreaSqFt(cat.typicalAreaSqFt);
    }
  };

  const toggleService = (slug) => {
    if (selectedServices.includes(slug)) {
      setSelectedServices(selectedServices.filter((s) => s !== slug));
    } else {
      setSelectedServices([...selectedServices, slug]);
    }
  };

  // Perform server-side calculation
  const calculateTotal = async () => {
    setErrorMessage('');
    if (!areaSqFt || areaSqFt < 100) {
      setErrorMessage('Please enter a valid property area (minimum 100 sq ft).');
      return;
    }

    try {
      setLoading(true);
      const res = await api.calculateEstimate({
        areaSqFt: Number(areaSqFt),
        propertyCategory,
        propertyType,
        selectedServiceSlugs: selectedServices,
      });

      if (res.success && res.estimate) {
        setEstimate(res.estimate);
        setStep(3);
      } else {
        setErrorMessage(res.message || 'Calculation error. Please check your inputs.');
      }
    } catch (err) {
      setErrorMessage('Unable to compute calculation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit estimate enquiry to backend
  const handleSubmitEstimate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!lead.name || !lead.phone || !lead.email) {
      setErrorMessage('Please provide your name, phone number, and email.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        enquiryType: 'calculator_estimate',
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        message: lead.message,
        propertyType,
        propertyCategory,
        propertyAreaSqFt: Number(areaSqFt),
        selectedServiceSlugs: selectedServices,
      };

      const res = await api.submitEnquiry(payload);
      if (res.success) {
        setSubmissionSuccess({
          referenceNumber: res.referenceNumber,
          breakdown: res.breakdown || estimate,
        });
        setStep(4);
      } else {
        setErrorMessage(res.message || 'Failed to submit estimate request.');
      }
    } catch (err) {
      setErrorMessage('Network error while saving estimate. Please reach us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Format INR Currency
  const formatINR = (val) => {
    return val ? val.toLocaleString('en-IN') : '0';
  };

  return (
    <div className="bg-white border border-studio-border shadow-card max-w-4xl mx-auto overflow-hidden">
      {/* Step Indicator Header */}
      <div className="border-b border-studio-border bg-studio-soft/80 px-6 py-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest font-semibold text-studio-muted">
          <div className="flex items-center space-x-2">
            <Calculator className="w-4 h-4 text-studio-teal" />
            <span className="text-studio-charcoal">Interior Cost Estimator</span>
          </div>
          <span className="text-studio-teal">Step {step} of 4</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-studio-border h-1 mt-3 rounded-none overflow-hidden">
          <motion.div
            className="bg-studio-teal h-full"
            initial={{ width: '25%' }}
            animate={{ width: `${step * 25}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Property Specifications */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif text-studio-charcoal font-semibold">
                Tell us about your residential property
              </h3>
              <p className="text-sm text-studio-muted mt-1">
                Select your floor plan configuration and estimated area in square feet.
              </p>
            </div>

            {/* BHK Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-3">
                Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {settings.propertyCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-4 border text-center transition-all ${
                      propertyCategory === cat.id
                        ? 'border-studio-teal bg-studio-tealLight text-studio-tealDark font-semibold shadow-subtle'
                        : 'border-studio-border bg-white text-studio-charcoal hover:border-studio-charcoal'
                    }`}
                  >
                    <span className="block text-lg font-serif">{cat.label}</span>
                    <span className="text-[11px] text-studio-muted mt-0.5 block">
                      ~{cat.typicalAreaSqFt} sq.ft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-2">
                Property Structure Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-3.5 border border-studio-border bg-studio-soft/40 text-sm text-studio-charcoal focus:border-studio-teal focus:bg-white outline-none transition-colors"
              >
                {settings.propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Square Footage Input with Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-charcoal">
                  Carpet / Super Area (Sq. Ft.)
                </label>
                <div className="flex items-center space-x-1">
                  <input
                    type="number"
                    min="200"
                    max="20000"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-24 p-1.5 border border-studio-border text-right text-sm font-semibold focus:border-studio-teal outline-none"
                  />
                  <span className="text-xs text-studio-muted">sq.ft</span>
                </div>
              </div>
              <input
                type="range"
                min="300"
                max="6000"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-studio-teal cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-studio-muted mt-1">
                <span>300 sq.ft</span>
                <span>3,000 sq.ft</span>
                <span>6,000+ sq.ft</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all duration-300"
              >
                <span>Continue to Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Additional Services Selection */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif text-studio-charcoal font-semibold">
                Customise Scope of Work
              </h3>
              <p className="text-sm text-studio-muted mt-1">
                Select additional architectural millwork and specialty fitments for your home.
              </p>
            </div>

            <div className="space-y-3">
              {additionalServices.length === 0 ? (
                <div className="text-sm text-studio-muted py-6 text-center">
                  Loading custom service rates...
                </div>
              ) : (
                additionalServices.map((svc) => {
                  const isChecked = selectedServices.includes(svc.slug);
                  return (
                    <div
                      key={svc.slug}
                      onClick={() => toggleService(svc.slug)}
                      className={`p-4 sm:p-5 border cursor-pointer transition-all flex items-start space-x-4 ${
                        isChecked
                          ? 'border-studio-teal bg-studio-tealLight/40 shadow-subtle'
                          : 'border-studio-border bg-white hover:border-studio-charcoal/50'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 mt-0.5 rounded-none flex items-center justify-center border transition-colors ${
                          isChecked
                            ? 'bg-studio-teal border-studio-teal text-white'
                            : 'border-studio-border bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-sm font-semibold text-studio-charcoal">
                            {svc.name}
                          </h4>
                          <span className="text-xs font-semibold text-studio-teal mt-0.5 sm:mt-0">
                            +{settings.currencySymbol}
                            {svc.ratePerSqFt} / sq.ft
                          </span>
                        </div>
                        {svc.description && (
                          <p className="text-xs text-studio-muted mt-1 leading-relaxed">
                            {svc.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-studio-border">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={calculateTotal}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all duration-300 disabled:opacity-50"
              >
                <span>{loading ? 'Calculating...' : 'View Cost Breakdown'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Breakdown & Review */}
        {step === 3 && estimate && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Verified Calculation
              </span>
              <h3 className="text-3xl font-serif text-studio-charcoal font-semibold mt-1">
                Estimated Project Investment
              </h3>
              <p className="text-sm text-studio-muted mt-1">
                Breakdown based on {estimate.areaSqFt} sq.ft {estimate.propertyType} (
                {estimate.propertyCategory.toUpperCase()}).
              </p>
            </div>

            {/* Total Highlight Box */}
            <div className="p-6 bg-studio-soft border border-studio-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-studio-muted font-medium">
                    Estimated Grand Total
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-studio-charcoal mt-1">
                    {estimate.currencySymbol} {formatINR(estimate.estimatedGrandTotal)}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <span className="text-xs text-studio-muted block">Effective Blended Rate</span>
                  <span className="text-sm font-semibold text-studio-teal">
                    {estimate.currencySymbol}
                    {Math.round(estimate.estimatedGrandTotal / estimate.areaSqFt)} / sq.ft
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-studio-border divide-y divide-studio-border text-sm">
              <div className="p-3.5 bg-studio-soft/60 flex justify-between font-semibold text-xs uppercase tracking-wider text-studio-charcoal">
                <span>Scope Item</span>
                <span>Estimated Cost</span>
              </div>

              {/* Base Execution */}
              <div className="p-3.5 flex justify-between items-center">
                <div>
                  <span className="font-medium text-studio-charcoal">Base Interior Execution & Civil Shell</span>
                  <span className="text-xs text-studio-muted block">
                    {estimate.areaSqFt} sq.ft × {estimate.currencySymbol}
                    {estimate.baseRatePerSqFt}/sq.ft
                  </span>
                </div>
                <span className="font-semibold text-studio-charcoal">
                  {estimate.currencySymbol} {formatINR(estimate.baseCost)}
                </span>
              </div>

              {/* Additional Services */}
              {estimate.selectedServices.map((svc) => (
                <div key={svc.name} className="p-3.5 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-studio-charcoal">{svc.name}</span>
                    <span className="text-xs text-studio-muted block">
                      {estimate.areaSqFt} sq.ft × {estimate.currencySymbol}
                      {svc.ratePerSqFt}/sq.ft
                    </span>
                  </div>
                  <span className="font-semibold text-studio-charcoal">
                    {estimate.currencySymbol} {formatINR(svc.cost)}
                  </span>
                </div>
              ))}
            </div>

            {/* Mandatory Indicative Disclaimer */}
            <div className="p-4 bg-studio-stone/60 border border-studio-border text-xs text-studio-muted leading-relaxed italic">
              "{estimate.disclaimer}"
            </div>

            {/* Lead capture form */}
            <form onSubmit={handleSubmitEstimate} className="space-y-4 pt-2">
              <h4 className="text-sm uppercase tracking-wider font-semibold text-studio-charcoal">
                Save Estimate & Request Detailed Consultation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (+91) *"
                  value={lead.phone}
                  onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  className="p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <textarea
                placeholder="Optional property location or specific design requirements..."
                rows="2"
                value={lead.message}
                onChange={(e) => setLead({ ...lead, message: e.target.value })}
                className="w-full p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
              />

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modify Services</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center space-x-2 px-8 py-3.5 bg-studio-teal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-tealDark transition-all duration-300 disabled:opacity-50"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit Estimate Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 4: Confirmation & Instant WhatsApp Action */}
        {step === 4 && submissionSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-16 h-16 bg-studio-tealLight text-studio-teal mx-auto rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Enquiry Confirmed
              </span>
              <h3 className="text-3xl font-serif text-studio-charcoal font-semibold mt-1">
                Estimate Successfully Logged
              </h3>
              <p className="text-sm text-studio-muted mt-2 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-studio-charcoal">{lead.name}</span>. Your unique enquiry reference is:
              </p>
              <div className="inline-block mt-3 px-5 py-2 bg-studio-soft border border-studio-border font-mono text-sm font-bold text-studio-teal">
                {submissionSuccess.referenceNumber}
              </div>
            </div>

            <div className="max-w-md mx-auto p-4 bg-studio-soft/80 border border-studio-border text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-studio-muted">Property:</span>
                <span className="font-semibold">{propertyType} ({propertyCategory.toUpperCase()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studio-muted">Total Area:</span>
                <span className="font-semibold">{areaSqFt} sq.ft</span>
              </div>
              <div className="flex justify-between border-t border-studio-border pt-1">
                <span className="text-studio-muted">Grand Total:</span>
                <span className="font-bold text-studio-teal">
                  ₹ {formatINR(submissionSuccess.breakdown?.estimatedGrandTotal || estimate?.estimatedGrandTotal)}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/916280609005?text=${encodeURIComponent(
                  `Hello Architecture Wonders! I just calculated an estimate on your website (Ref: ${
                    submissionSuccess.referenceNumber
                  }) for my ${areaSqFt} sq.ft ${propertyType}. Total: ₹${formatINR(
                    submissionSuccess.breakdown?.estimatedGrandTotal || estimate?.estimatedGrandTotal
                  )}. I would like to schedule a consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-studio-teal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-tealDark transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSubmissionSuccess(null);
                  setLead({ name: '', phone: '', email: '', message: '' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 border border-studio-border text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:bg-studio-soft transition-all"
              >
                <span>Calculate Another Project</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
