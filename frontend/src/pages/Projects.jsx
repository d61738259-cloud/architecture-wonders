import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Filter } from 'lucide-react';
import { api } from '../services/api';
import SEO from '../components/SEO';

const categories = [
  'All Projects',
  'Full Home Interiors',
  'Living Rooms',
  'Bedrooms',
  'Modular Kitchens',
  'Wardrobes',
  'Residential Architecture',
  'Renovation Projects',
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All Projects') {
          params.category = selectedCategory;
        }
        const res = await api.getProjects(params);
        if (res?.projects) {
          setProjects(res.projects);
        }
      } catch (e) {
        console.warn('Failed loading projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [selectedCategory]);

  return (
    <div className="bg-white">
      <SEO
        title="Completed Interior & Architecture Projects Portfolio | Architecture Wonders"
        description="Browse 50+ completed luxury residential interior projects by Architecture Wonders across Zirakpur, VIP Road, Mohali, and Chandigarh."
        keywords="interior design projects zirakpur, luxury apartments portfolio chandigarh, residential architecture mohali, 4bhk interior design photos"
      />
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Verified Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Selected Residential Architecture & Interior Commissions
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Exploring completed homes across Zirakpur, Chandigarh, and Mohali. Every project exemplifies spatial balance and uncompromising materiality.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="border-b border-studio-border bg-white sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar py-3">
          <div className="flex items-center space-x-2 sm:space-x-3 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-studio-charcoal text-white'
                    : 'text-studio-muted hover:text-studio-charcoal hover:bg-studio-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-24 text-center text-sm text-studio-muted">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <p className="text-xl font-serif text-studio-charcoal">No projects found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All Projects')}
                className="text-xs uppercase tracking-wider text-studio-teal font-semibold"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {projects.map((proj) => (
                  <motion.div
                    key={proj._id || proj.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link to={`/projects/${proj.slug}`}>
                      <div className="relative aspect-[4/3] bg-studio-stone overflow-hidden border border-studio-border">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-studio-charcoal">
                          {proj.category}
                        </div>
                      </div>

                      <div className="pt-4 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors">
                            {proj.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-studio-muted group-hover:text-studio-teal transition-colors" />
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-studio-muted">
                          <MapPin className="w-3.5 h-3.5 text-studio-teal" />
                          <span>{proj.location}</span>
                          {proj.areaSqFt && (
                            <>
                              <span>·</span>
                              <span>{proj.areaSqFt} sq.ft</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
