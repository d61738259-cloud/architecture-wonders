import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin, MessageSquare, Phone, Calendar, Maximize2 } from 'lucide-react';
import { api } from '../services/api';
import SEO from '../components/SEO';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.getProjectBySlug(slug);
        if (res?.project) {
          setProject(res.project);
          setActiveImage(res.project.coverImage);
          if (res.relatedProjects) setRelatedProjects(res.relatedProjects);
        }
      } catch (e) {
        console.warn('Failed loading project');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-sm text-studio-muted">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="text-2xl font-serif">Project Not Found</h2>
        <Link to="/projects" className="text-xs uppercase tracking-wider text-studio-teal">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  // Combine cover and gallery
  const allImages = [
    { url: project.coverImage, caption: 'Primary View' },
    ...(project.gallery || []),
  ];

  return (
    <div className="bg-white">
      <SEO
        title={`${project.title} | Architecture Wonders`}
        description={project.overview || project.description || `Explore ${project.title} in ${project.location} designed by Architecture Wonders.`}
        image={project.coverImage}
      />
      {/* Top Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal block mb-1">
                {project.category}
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight">
                {project.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4 text-xs text-studio-muted border-t md:border-t-0 pt-3 md:pt-0 border-studio-border">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-studio-teal" />
                <span>{project.location}</span>
              </span>
              {project.areaSqFt && (
                <span className="flex items-center space-x-1.5">
                  <Maximize2 className="w-4 h-4 text-studio-teal" />
                  <span>{project.areaSqFt} sq.ft</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Large Featured Image View */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-[16/10] bg-studio-stone border border-studio-border overflow-hidden">
            <img
              src={activeImage || project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto py-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img.url)}
                  className={`w-24 h-16 shrink-0 border overflow-hidden transition-all ${
                    activeImage === img.url
                      ? 'border-studio-teal ring-2 ring-studio-teal/20'
                      : 'border-studio-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Overview & Narrative */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-studio-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Narrative */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold text-studio-charcoal">
                Project Overview
              </h3>
              <p className="text-sm text-studio-charcoal leading-relaxed font-light">
                {project.overview}
              </p>
            </div>

            {project.designConcept && (
              <div className="space-y-3 p-6 bg-studio-soft border border-studio-border">
                <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal block">
                  Design Concept
                </span>
                <p className="text-sm text-studio-charcoal leading-relaxed italic font-serif">
                  "{project.designConcept}"
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold text-studio-charcoal">
                Architectural Specifications & Execution
              </h3>
              <div className="text-sm text-studio-muted leading-relaxed font-light space-y-3">
                <p>{project.description}</p>
              </div>
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-8 border border-studio-border bg-studio-soft space-y-6">
              <span className="text-[11px] uppercase tracking-widest text-studio-teal font-semibold block">
                Inspired by this project?
              </span>
              <h4 className="text-2xl font-serif font-semibold text-studio-charcoal">
                Enquire About a Similar Residence
              </h4>
              <p className="text-xs text-studio-muted leading-relaxed">
                Connect with Architecture Wonders to craft a tailored home interior reflecting the same aesthetic standards.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/916280609005?text=${encodeURIComponent(
                    `Hello Architecture Wonders! I am inquiring about project reference "${project.title}" located in ${project.location}. I would like to explore a similar design for my home.`
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
                  <span>Estimate Your Home Cost</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-studio-border text-xs text-studio-muted space-y-1">
                <p className="font-semibold text-studio-charcoal">Studio Direct:</p>
                <a href="tel:+916280609005" className="hover:text-studio-charcoal transition-colors">
                  +91 6280 609 005
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-studio-soft/60 border-t border-studio-border px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <h3 className="text-2xl font-serif font-light text-studio-charcoal">
              Related {project.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="group">
                  <div className="aspect-[4/3] bg-studio-stone border border-studio-border overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-base font-serif font-semibold text-studio-charcoal mt-3 group-hover:text-studio-teal transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-xs text-studio-muted">{p.location}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
