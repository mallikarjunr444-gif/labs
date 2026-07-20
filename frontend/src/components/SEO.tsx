import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonical, image }) => {
  useEffect(() => {
    const siteName = 'Medicus Labs';
    const fullTitle = `${title} | ${siteName}`;

    // Set title
    document.title = fullTitle;

    // Helper to set/update meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('description', description);

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:site_name', siteName, true);
    setMeta('og:type', 'website', true);
    if (image) setMeta('og:image', image, true);

    // Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    // Canonical URL
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    const url = canonical || window.location.href;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', url);

    // Cleanup - remove meta tags on unmount (optional, prevents stale data)
    return () => {
      // We keep the title but metadata will be overridden by next page
    };
  }, [title, description, canonical, image]);

  return null;
};

export default SEO;