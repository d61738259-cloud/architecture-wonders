import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DesignProcess() {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Site Immersion',
      subtitle: 'Understanding Lifestyle, Vision, and Spatial Intent',
      desc: 'Our journey begins with an in-depth consultation at your property or our Zirakpur studio. We explore your family routines, storage requirements, preferred materials, and budgetary expectations while taking precise laser site measurements.',
      points: [
        'Detailed lifestyle & functional requirement analysis',
        'Physical on-site architectural measurements',
        'Initial budget alignment & timeline feasibility',
      ],
    },
    {
      num: '02',
      title: 'Spatial Planning & 3D Visualization',
      subtitle: 'From 2D Furniture Layouts to Photorealistic Renders',
      desc: 'Our design team develops comprehensive architectural space plans and photorealistic 3D visualisations. You can evaluate natural daylight angles, furniture scales, finishes, and ambient lighting before construction commences.',
      points: [
        'Optimized circulation corridors and furniture zoning',
        'Photorealistic 3D perspective renders for every room',
        'Material and color mood board presentations',
      ],
    },
    {
      num: '03',
      title: 'Material Specification & Itemized BOQ',
      subtitle: 'Uncompromising Transparency in Materiality',
      desc: 'We present a line-by-line Bill of Quantities (BOQ). We specify certified IS:710 marine ply, premium quartz, soft-close German hardware, and luxury wall textures with transparent unit rates.',
      points: [
        'Zero hidden pricing surprises or unexpected escalation',
        'Verified hardware & plywood brand certifications',
        'Clear milestone-linked payment schedules',
      ],
    },
    {
      num: '04',
      title: 'Precision Civil & MEP Execution',
      subtitle: 'Structural Adjustments and Concealed Engineering',
      desc: 'Civil modifications, electrical conduits, plumbing lines, and gypsum false ceiling frameworks are executed by experienced technical crews under on-site architectural supervision.',
      points: [
        'Concealed plumbing and drainage pressure testing',
        'Laser-levelled ceiling framing and conduit runs',
        'Strict on-site safety and dust management protocols',
      ],
    },
    {
      num: '05',
      title: 'Custom Joinery, Millwork & Lighting',
      subtitle: 'Artisanal Craftsmanship and Fitting',
      desc: 'Floor-to-ceiling sliding wardrobes, modular kitchen cabinetry, fluted wall claddings, and magnetic track lighting fixtures are precision-fitted by master craftsmen.',
      points: [
        'Factory-calibrated modular edge banding and assembly',
        'High-CRI architectural luminaire alignment and scene setting',
        'Flawless marble, tile, and stone joint sealing',
      ],
    },
    {
      num: '06',
      title: 'Quality Audit & Studio Handover',
      subtitle: 'Delivering Perfection Ready for Gracious Living',
      desc: 'Prior to key handover, our team conducts a thorough 120-point quality audit, followed by professional deep cleaning. We provide hardware warranty certificates and maintenance guidelines.',
      points: [
        '120-point architectural finishing inspection',
        'Professional deep cleaning and sanitization',
        'Formal site handover and warranty documentation',
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Workflow & Methodology
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            A Structured Architectural Journey from Vision to Handover
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Our 6-phase design process provides homeowners with complete visual certainty, technical precision, and transparent milestone delivery.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="border border-studio-border bg-white p-8 sm:p-10 shadow-subtle relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-6xl sm:text-7xl font-serif font-bold text-studio-stone/60 select-none pointer-events-none">
                {step.num}
              </div>

              <div className="space-y-4 relative z-10">
                <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                  Phase {step.num}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-studio-charcoal">
                  {step.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-studio-muted font-medium">
                  {step.subtitle}
                </h4>

                <p className="text-sm text-studio-charcoal leading-relaxed font-light pt-2">
                  {step.desc}
                </p>

                <div className="pt-4 border-t border-studio-border/70 space-y-2">
                  {step.points.map((pt, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-studio-muted">
                      <CheckCircle2 className="w-4 h-4 text-studio-teal shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-studio-soft border-t border-studio-border text-center px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-serif font-light text-studio-charcoal">
            Experience Our Process on Your Residence
          </h2>
          <p className="text-sm text-studio-muted">
            Book a site immersion session with our design principals in Zirakpur or calculate your indicative project cost online.
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
