import { useEffect } from 'react';

export default function SEO({
  title = 'Architecture Wonders | Premium Architecture & Interior Design Studio',
  description = 'Architecture Wonders is an editorial architecture and luxury interior design studio based in Zirakpur, Punjab. 50+ completed residential projects across Zirakpur, Chandigarh & Mohali.',
  keywords = 'interior designers in zirakpur, home interior designers zirakpur, residential interior design chandigarh, modular kitchen designers mohali, architecture wonders',
  image = '/logo.png',
  canonicalUrl,
}) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Architecture Wonders')
      ? title
      : `${title} | Architecture Wonders`;
    document.title = fullTitle;

    // 2. Helper to set/update meta tag
    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    // 4. Update OpenGraph Tags
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    if (image) setMeta('og:image', image, true);
    setMeta('og:type', 'website', true);

    // 5. Update Twitter Card Tags
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    // 6. Canonical link
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, image, canonicalUrl]);

  return null;
}
