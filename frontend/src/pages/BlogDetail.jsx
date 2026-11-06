import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.getArticleBySlug(slug);
        if (res?.article) {
          setArticle(res.article);
          if (res.relatedArticles) setRelatedArticles(res.relatedArticles);
        }
      } catch (e) {
        console.warn('Failed loading article');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-sm text-studio-muted">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="text-2xl font-serif">Article Not Found</h2>
        <Link to="/blog" className="text-xs uppercase tracking-wider text-studio-teal">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-studio-soft border-b border-studio-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-studio-muted hover:text-studio-charcoal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Articles</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs uppercase tracking-wider text-studio-teal font-semibold">
            <span>{article.category}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-studio-charcoal font-light leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 pt-2 text-xs text-studio-muted border-t border-studio-border">
            <span className="flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-studio-teal" />
              <span>{article.author}</span>
            </span>
            <span>·</span>
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-studio-teal" />
              <span>{new Date(article.publishedAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.coverImage && (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto aspect-[16/9] bg-studio-stone border border-studio-border overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-neutral max-w-none text-studio-charcoal leading-relaxed font-light space-y-6">
            <p className="text-lg font-serif italic text-studio-muted border-l-2 border-studio-teal pl-4 py-1">
              {article.summary}
            </p>

            {/* Split content by newlines or headings */}
            <div className="space-y-6 pt-4 text-sm leading-relaxed whitespace-pre-line font-normal">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-10 mt-12 border-t border-studio-border flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-studio-muted mr-2">Tags:</span>
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-studio-soft border border-studio-border text-xs text-studio-charcoal"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-studio-soft/60 border-t border-studio-border px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h3 className="text-2xl font-serif font-light text-studio-charcoal">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.slug}
                  to={`/blog/${ra.slug}`}
                  className="p-5 bg-white border border-studio-border block group hover:border-studio-charcoal/50"
                >
                  <span className="text-[10px] uppercase tracking-wider text-studio-teal font-semibold block mb-1">
                    {ra.readTime}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-studio-charcoal group-hover:text-studio-teal transition-colors line-clamp-2">
                    {ra.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
