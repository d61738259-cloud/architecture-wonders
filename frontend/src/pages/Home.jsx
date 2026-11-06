import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle,
  Clock,
  Compass,
  Home as HomeIcon,
  Layers,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import CostCalculator from '../components/CostCalculator';
import { api } from '../services/api';
import {
  fadeInUp,
  staggerContainer,
  heroTextStagger,
  imageMaskReveal,
} from '../animations/variants';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projRes, servRes, testRes, blogRes] = await Promise.all([
          api.getProjects({ limit: 4, featured: 'true' }),
          api.getServices(),
          api.getTestimonials(),
          api.getBlogArticles({ limit: 3 }),
        ]);

        if (projRes?.projects) setProjects(projRes.projects);
        if (servRes?.services) setServices(servRes.services);
        if (testRes?.testimonials) setTestimonials(testRes.testimonials);
        if (blogRes?.articles) setArticles(blogRes.articles);
      } catch (e) {
        console.warn('Failed loading dynamic home content');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const designProcessSteps = [
    {
      num: '01',
      title: 'Consultation & Site Immersion',
      desc: 'We meet at your property or our Zirakpur studio to understand your lifestyle, aesthetic inclinations, spatial prerequisites, and timeline.',
    },
    {
      num: '02',
      title: 'Spatial Planning & 3D Visualization',
      desc: 'Translating concepts into accurate architectural blueprints and photorealistic 3D renders so you experience every angle prior to execution.',
    },
    {
      num: '03',
      title: 'Material Curation & Estimation',
      desc: 'Transparent line-item specification covering IS-certified timber, natural stones, quartz surfaces, and branded German hardware.',
    },
    {
      num: '04',
      title: 'Precision Civil & MEP Execution',
      desc: 'Our experienced engineering teams execute structural adjustments, electrical conduit routing, plumbing, and seamless false ceiling planes.',
    },
    {
      num: '05',
      title: 'Bespoke Millwork & Fitting',
      desc: 'On-site and modular fabrication of floor-to-ceiling wardrobes, modular kitchen cabinetry, and custom architectural wall panelling.',
    },
    {
      num: '06',
      title: 'Quality Audit & Studio Handover',
      desc: 'A comprehensive multi-point quality checklist, professional deep cleaning, and formal site handover ready for gracious living.',
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-studio-soft border-b border-studio-border px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-studio-border text-xs uppercase tracking-widest text-studio-charcoal font-semibold"
            >
              <span className="w-1.5 h-1.5 bg-studio-teal rounded-full" />
              <span>Architecture & Interior Design Studio · Est. 2023</span>
            </motion.div>

            <motion.h1
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif text-studio-charcoal tracking-tight font-light leading-[1.08]"
            >
              Sculpting <span className="italic font-normal">Modern Living</span> with Architectural Purity
            </motion.h1>

            <motion.p
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base sm:text-lg text-studio-muted leading-relaxed max-w-xl font-light"
            >
              Architecture Wonders delivers bespoke residential architecture and interior environments across Zirakpur, Chandigarh, and Mohali. Verified experience of 50+ completed home interior projects.
            </motion.p>

            <motion.div
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              custom={3}
              className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
            >
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all duration-300"
              >
                <span>Calculate Project Cost</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white border border-studio-border text-studio-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-studio-soft transition-all duration-300"
              >
                <span>Explore Portfolio</span>
              </Link>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              custom={4}
              className="pt-8 border-t border-studio-border/80 grid grid-cols-3 gap-6 text-left"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-studio-charcoal block">50+</span>
                <span className="text-[11px] uppercase tracking-wider text-studio-muted">Completed Interiors</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-studio-charcoal block">2023</span>
                <span className="text-[11px] uppercase tracking-wider text-studio-muted">Studio Established</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-studio-teal block">Tri-City</span>
                <span className="text-[11px] uppercase tracking-wider text-studio-muted">Zirakpur · Chd · Mohali</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <motion.div
              variants={imageMaskReveal}
              initial="hidden"
              animate="visible"
              className="relative aspect-[4/5] bg-studio-stone overflow-hidden border border-studio-border shadow-elevated"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Contemporary Architecture Wonders Interior in Zirakpur"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-charcoal/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="uppercase tracking-widest text-studio-coralLight font-semibold block">VIP Road Residence</span>
                <span className="font-serif text-base italic">Complete Turnkey Interior · Zirakpur</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STUDIO INTRODUCTION */}
      <section className="py-24 bg-white border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Our Architectural Pedigree
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-studio-charcoal font-light leading-tight">
                Rooted in Craftsmanship, Elevated by Spatial Elegance
              </h2>
              <div className="w-12 h-0.5 bg-studio-teal" />
            </div>

            <div className="lg:col-span-7 space-y-6 text-base text-studio-muted leading-relaxed font-light">
              <p>
                Established in <strong className="text-studio-charcoal font-semibold">2023</strong> in Zirakpur, Punjab, <strong className="text-studio-charcoal font-semibold">Architecture Wonders</strong> was founded on the philosophy that residential spaces should be authentic expressions of serenity, proportion, and craftsmanship.
              </p>
              <p>
                With over <strong className="text-studio-charcoal font-semibold">50+ verified completed residential home interior projects</strong> across Zirakpur, Chandigarh, and Mohali, our studio approaches every commission with rigorous architectural precision. We reject fleeting gimmicks in favour of enduring natural materials, pure geometries, and client-tailored ergonomics.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:text-studio-teal transition-colors"
                >
                  <span>Learn more about our philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PREVIEW */}
      <section className="py-24 bg-studio-soft border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Core Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
                Bespoke Architectural & Interior Services
              </h2>
            </div>
            <Link
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:text-studio-teal transition-colors"
            >
              <span>View All 9 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service.slug}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white border border-studio-border p-8 flex flex-col justify-between hover:border-studio-charcoal/60 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-studio-soft border border-studio-border flex items-center justify-center text-studio-teal group-hover:bg-studio-teal group-hover:text-white transition-colors duration-300">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-studio-charcoal">
                    {service.title}
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-6 border-t border-studio-border/60 mt-6 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs uppercase tracking-wider font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/calculator"
                    className="text-[11px] text-studio-muted hover:text-studio-charcoal uppercase tracking-wider font-medium"
                  >
                    Estimate Cost
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PROJECTS */}
      <section className="py-24 bg-white border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Selected Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
                Curated Residential Commissions
              </h2>
            </div>
            <Link
              to="/projects"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:text-studio-teal transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.slug}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                className="group cursor-pointer"
              >
                <Link to={`/projects/${proj.slug}`}>
                  <div className="relative aspect-[16/10] bg-studio-stone overflow-hidden border border-studio-border">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-studio-charcoal">
                      {proj.category}
                    </div>
                  </div>

                  <div className="pt-5 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors">
                        {proj.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-studio-muted group-hover:text-studio-teal transition-colors" />
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-studio-muted">
                      <MapPin className="w-3.5 h-3.5 text-studio-teal" />
                      <span>{proj.location}</span>
                      <span>·</span>
                      <span>{proj.areaSqFt} sq.ft</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR DESIGN PROCESS */}
      <section className="py-24 bg-studio-stone/30 border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
              Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
              Our Architectural & Interior Workflow
            </h2>
            <p className="text-sm text-studio-muted mt-3">
              A transparent 6-stage journey structured to ensure design purity, budget adherence, and meticulous execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcessSteps.map((step) => (
              <div
                key={step.num}
                className="p-8 bg-white border border-studio-border flex flex-col justify-between space-y-4"
              >
                <span className="text-2xl font-serif font-bold text-studio-teal">
                  {step.num}
                </span>
                <h3 className="text-lg font-serif font-semibold text-studio-charcoal">
                  {step.title}
                </h3>
                <p className="text-xs text-studio-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY ARCHITECTURE WONDERS */}
      <section className="py-24 bg-white border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Studio Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-studio-charcoal font-light leading-tight">
                Why Discerning Homeowners Choose Architecture Wonders
              </h2>
              <p className="text-sm text-studio-muted leading-relaxed">
                We believe exceptional interiors are never accidental. They stem from transparent relationships, seasoned craftsmanship, and obsessive attention to architectural detail.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 border border-studio-border bg-studio-soft/60 space-y-3">
                <ShieldCheck className="w-6 h-6 text-studio-teal" />
                <h4 className="text-base font-serif font-semibold text-studio-charcoal">
                  50+ Verified Completed Projects
                </h4>
                <p className="text-xs text-studio-muted leading-relaxed">
                  A tangible track record across luxury apartments and independent residences in Zirakpur, Chandigarh, and Mohali.
                </p>
              </div>

              <div className="p-6 border border-studio-border bg-studio-soft/60 space-y-3">
                <Award className="w-6 h-6 text-studio-teal" />
                <h4 className="text-base font-serif font-semibold text-studio-charcoal">
                  Certified Material Specifications
                </h4>
                <p className="text-xs text-studio-muted leading-relaxed">
                  Only IS:710 Marine Grade BWP ply, premium quartz, anti-fingerprint laminates, and international German hardware.
                </p>
              </div>

              <div className="p-6 border border-studio-border bg-studio-soft/60 space-y-3">
                <Clock className="w-6 h-6 text-studio-teal" />
                <h4 className="text-base font-serif font-semibold text-studio-charcoal">
                  Guaranteed Handover Timelines
                </h4>
                <p className="text-xs text-studio-muted leading-relaxed">
                  Structured milestone-based project management ensuring civil, carpentry, and electrical works finish on schedule.
                </p>
              </div>

              <div className="p-6 border border-studio-border bg-studio-soft/60 space-y-3">
                <Sparkles className="w-6 h-6 text-studio-teal" />
                <h4 className="text-base font-serif font-semibold text-studio-charcoal">
                  Photorealistic 3D Certainty
                </h4>
                <p className="text-xs text-studio-muted leading-relaxed">
                  Clear visual agreement before demolition or fabrication begins. What you approve is exactly what is delivered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE COST CALCULATOR */}
      <section className="py-24 bg-studio-soft border-b border-studio-border" id="calculator-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
              Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-studio-charcoal font-light mt-2">
              Interactive Square Feet Cost Estimator
            </h2>
            <p className="text-sm text-studio-muted mt-3">
              Calculate indicative investment estimates for your residential interior based on current studio rates.
            </p>
          </div>

          <CostCalculator />
        </div>
      </section>

      {/* SECTION 8: CLIENT TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
              Client Impressions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
              Genuine Homeowner Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t._id || t.clientName}
                className="p-8 border border-studio-border bg-studio-soft/40 flex flex-col justify-between space-y-6"
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
                <div className="border-t border-studio-border pt-4">
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
        </div>
      </section>

      {/* SECTION 9: INSTAGRAM & SOCIAL */}
      <section className="py-20 bg-studio-stone/20 border-b border-studio-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Social Journal
          </span>
          <h2 className="text-3xl font-serif text-studio-charcoal font-light">
            Follow Our On-Site Progress & Editorial Renders
          </h2>
          <p className="text-sm text-studio-muted max-w-md mx-auto">
            Discover ongoing residential site handovers, millwork prototyping, and interior mood boards on our official handle.
          </p>
          <div className="pt-2">
            <a
              href="https://www.instagram.com/architecturewonders05/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white border border-studio-border text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:bg-studio-charcoal hover:text-white transition-all duration-300"
            >
              <span>Follow @architecturewonders05</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 10: BLOG / INSIGHTS PREVIEW */}
      <section className="py-24 bg-white border-b border-studio-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
                Editorial Journal
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-studio-charcoal font-light mt-2">
                Interior Design Insights & Guides
              </h2>
            </div>
            <Link
              to="/blog"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-charcoal hover:text-studio-teal transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.slug}
                className="group border border-studio-border p-6 flex flex-col justify-between hover:border-studio-charcoal/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="text-[11px] uppercase tracking-wider text-studio-teal font-semibold">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors">
                    <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-studio-muted leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-studio-border/60 mt-6">
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold text-studio-charcoal group-hover:text-studio-teal"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: CONTACT CTA & VISIT STUDIO */}
      <section className="py-24 bg-studio-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-studio-charcoal text-white p-8 sm:p-16 border border-studio-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase tracking-widest text-studio-coral font-semibold">
                  Start Your Journey
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif font-light leading-tight">
                  Ready to Shape Your Dream Home with Architecture Wonders?
                </h2>
                <p className="text-sm text-studio-muted leading-relaxed max-w-xl">
                  Schedule a private architectural design consultation at our studio in Star City Business Plaza, VIP Road, Zirakpur, or request an on-site property evaluation.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href="https://wa.me/916280609005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 bg-studio-teal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-tealDark transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 bg-white/10 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
