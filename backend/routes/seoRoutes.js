import express from 'express';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import BlogArticle from '../models/BlogArticle.js';

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const siteUrl = process.env.FRONTEND_URL || 'https://architecturewonders.com';

    const staticRoutes = [
      '',
      '/about',
      '/services',
      '/projects',
      '/process',
      '/calculator',
      '/testimonials',
      '/blog',
      '/contact',
    ];

    const [projects, services, articles] = await Promise.all([
      Project.find({ isPublished: true }).select('slug updatedAt'),
      Service.find({ isPublished: true }).select('slug updatedAt'),
      BlogArticle.find({ isPublished: true }).select('slug updatedAt'),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    staticRoutes.forEach((route) => {
      xml += `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    // Dynamic Services
    services.forEach((s) => {
      xml += `  <url>\n    <loc>${siteUrl}/services/${s.slug}</loc>\n    <lastmod>${(s.updatedAt || new Date()).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // Dynamic Projects
    projects.forEach((p) => {
      xml += `  <url>\n    <loc>${siteUrl}/projects/${p.slug}</loc>\n    <lastmod>${(p.updatedAt || new Date()).toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // Dynamic Blog Articles
    articles.forEach((a) => {
      xml += `  <url>\n    <loc>${siteUrl}/blog/${a.slug}</loc>\n    <lastmod>${(a.updatedAt || new Date()).toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

router.get('/robots.txt', (req, res) => {
  const siteUrl = process.env.FRONTEND_URL || 'https://architecturewonders.com';
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

export default router;
