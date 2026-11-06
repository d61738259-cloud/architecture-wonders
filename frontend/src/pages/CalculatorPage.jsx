import React from 'react';
import CostCalculator from '../components/CostCalculator';
import SEO from '../components/SEO';
import { ShieldCheck, Layers, FileText, CheckCircle2 } from 'lucide-react';

export default function CalculatorPage() {
  return (
    <div className="bg-white">
      <SEO
        title="Interior Cost Calculator per Sq Ft | Architecture Wonders Zirakpur"
        description="Calculate realistic residential interior design costs per square foot in Zirakpur, Chandigarh, and Mohali. Free instant estimate for 2BHK, 3BHK, 4BHK and luxury villas."
        keywords="interior design cost per sq ft zirakpur, interior cost calculator chandigarh, home interior cost estimator mohali, 3bhk interior budget zirakpur"
      />
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Financial Transparency
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Square Feet Interior Cost Estimator
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Configure your apartment or villa specifications to calculate an indicative cost breakdown backed by verified Architecture Wonders studio rates.
          </p>
        </div>
      </section>

      {/* Main Calculator Body */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CostCalculator />
        </div>
      </section>

      {/* Pricing Methodology & Assurance */}
      <section className="py-16 bg-studio-soft/60 border-t border-studio-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-studio-border space-y-2">
            <ShieldCheck className="w-5 h-5 text-studio-teal" />
            <h4 className="text-sm font-semibold text-studio-charcoal">No Hidden Surcharges</h4>
            <p className="text-xs text-studio-muted leading-relaxed">
              Our rates include civil preparation, architectural supervision, and certified material specifications.
            </p>
          </div>

          <div className="p-6 bg-white border border-studio-border space-y-2">
            <Layers className="w-5 h-5 text-studio-teal" />
            <h4 className="text-sm font-semibold text-studio-charcoal">Modular Scope Selection</h4>
            <p className="text-xs text-studio-muted leading-relaxed">
              Add or omit custom wardrobes, false ceiling profiles, or modular kitchens based on your specific requirements.
            </p>
          </div>

          <div className="p-6 bg-white border border-studio-border space-y-2">
            <FileText className="w-5 h-5 text-studio-teal" />
            <h4 className="text-sm font-semibold text-studio-charcoal">Itemized Final Quotation</h4>
            <p className="text-xs text-studio-muted leading-relaxed">
              Upon on-site measurements, we provide an immutable line-by-line Bill of Quantities (BOQ).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
