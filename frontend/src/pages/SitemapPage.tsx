import React from 'react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';
import { articlesList } from './BlogIndex';

const GROUPS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Medicus Labs',
    links: [
      { label: 'Home', to: '/' },
      { label: 'AI skin analysis', to: '/analysis' },
      { label: 'Find a dermatologist', to: '/find-dermatologist' },
      { label: 'Features', to: '/features' },
      { label: 'AI research and validation', to: '/research' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Founder', to: '/founder' },
      { label: 'Team', to: '/team' },
      { label: 'Contact', to: '/contact' },
      { label: 'Report an issue', to: '/report' },
      { label: 'Editorial policy', to: '/editorial-policy' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Use', to: '/terms-conditions' },
      { label: 'Medical Disclaimer', to: '/disclaimer' },
    ],
  },
];

const SitemapPage: React.FC = () => {
  const categories = Array.from(new Set(articlesList.map((a) => a.category)));
  const link = 'text-[17px] text-[#1d1d1f] hover:text-[#0071e3] hover:underline';

  return (
    <>
      <SEO title="Sitemap" description="Every page on Medicus Labs in one place: skin analysis, health library articles, company and legal pages." canonical="https://medicuslabs.app/sitemap" />
      <div className="bg-white pt-12 text-[#1d1d1f]">
        <section className="bg-[#f5f5f7] px-5 pb-14 pt-16 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-[1080px]">
            <h1 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[56px]">Sitemap</h1>
            <p className="mt-5 max-w-[620px] text-[19px] leading-[1.45] text-[#6e6e73] sm:text-[21px]">Every page on Medicus Labs, in one place.</p>
          </div>
        </section>

        <div className="mx-auto max-w-[1080px] space-y-16 px-5 py-14 sm:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            {GROUPS.map((g) => (
              <section key={g.title} aria-labelledby={`sm-${g.title}`}>
                <h2 id={`sm-${g.title}`} className="text-[21px] font-semibold tracking-[-0.02em]">{g.title}</h2>
                <ul className="mt-4 space-y-3 border-t border-[#d2d2d7] pt-4">
                  {g.links.map((l) => (<li key={l.to}><Link to={l.to} className={link}>{l.label}</Link></li>))}
                </ul>
              </section>
            ))}
          </div>

          <section aria-labelledby="sm-library">
            <h2 id="sm-library" className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px]">Health library</h2>
            <p className="mt-2 text-[17px] text-[#6e6e73]"><Link to="/blog" className="text-[#0071e3] hover:underline">All articles ›</Link></p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {categories.map((c) => (
                <div key={c}>
                  <h3 className="text-[17px] font-semibold text-[#6e6e73]">{c}</h3>
                  <ul className="mt-3 space-y-3 border-t border-[#d2d2d7] pt-4">
                    {articlesList.filter((a) => a.category === c).map((a) => (
                      <li key={a.slug}><Link to={a.slug} className={link}>{a.title.split(':')[0]}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
        <PremiumFooter />
      </div>
    </>
  );
};

export default SitemapPage;
