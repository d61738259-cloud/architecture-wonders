import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { api } from '../services/api';
import SEO from '../components/SEO';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getBlogArticles();
        if (res?.articles) setArticles(res.articles);
      } catch (e) {
        console.warn('Failed loading articles');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white">
      <SEO
        title="Architecture & Interior Design Blog | Architecture Wonders Zirakpur"
        description="Expert guides on residential interior costs per sq ft in Zirakpur, modular kitchen finishes, acrylic vs PU, and timeless Indian home materials."
        keywords="interior design blog zirakpur, cost per sq ft guide, modular kitchen materials, interior architecture articles chandigarh"
      />
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-studio-teal">
            Editorial Insights
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-studio-charcoal font-light leading-tight max-w-3xl">
            Design Knowledge, Material Guides & Architectural Perspectives
          </h1>
          <p className="text-base text-studio-muted max-w-2xl font-light leading-relaxed">
            Curated essays by the Architecture Wonders team on spatial ergonomics, modular kitchen planning, and contemporary residential living.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-20 text-center text-sm text-studio-muted">
              Loading articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-20 text-center text-sm text-studio-muted">
              No published articles found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="border border-studio-border bg-white flex flex-col justify-between hover:border-studio-charcoal/60 transition-colors group"
                >
                  {article.coverImage && (
                    <div className="aspect-[16/10] bg-studio-stone overflow-hidden border-b border-studio-border">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-[11px] uppercase tracking-wider text-studio-teal font-semibold">
                        <span>{article.category}</span>
                        <span>·</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-2xl font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h2>

                      <p className="text-xs text-studio-muted leading-relaxed line-clamp-3">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-studio-border/60">
                      <Link
                        to={`/blog/${article.slug}`}
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
