import React from 'react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from './SEO';

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

const LegalLayout: React.FC<{
  seoTitle: string;
  seoDescription: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  sibling: { to: string; label: string };
}> = ({ seoTitle, seoDescription, title, updated, intro, sections, sibling }) => (
  <>
    <SEO title={seoTitle} description={seoDescription} />
    <div className="bg-white pt-12 text-[#1d1d1f]">
      <header className="relative overflow-hidden bg-[#f5f5f7] px-5 pb-14 pt-20 text-center sm:pb-20 sm:pt-28">
        <p className="text-[15px] font-semibold text-[#6e6e73]">Legal</p>
        <h1 className="mt-2 text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[64px]">{title}</h1>
        <p className="mx-auto mt-4 max-w-[620px] text-[17px] leading-[1.5] text-[#6e6e73] sm:text-[19px]">{intro}</p>
        <p className="mt-5 text-[13px] text-[#86868b]">Last updated {updated}</p>
      </header>

      <div className="mx-auto grid max-w-[1080px] gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#86868b]">Contents</p>
            <ol className="mt-4 space-y-2.5 text-[14px]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[#6e6e73] hover:text-[#0071e3]">
                    <span className="mr-2 tabular-nums text-[#86868b]">{i + 1}.</span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="min-w-0 space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-[24px] font-semibold tracking-[-0.02em] sm:text-[28px]">
                <span className="mr-2 text-[#86868b]">{i + 1}.</span>{s.title}
              </h2>
              <div className="mt-4 space-y-4 text-[17px] leading-[1.6] text-[#424245] [&_a]:text-[#0071e3] [&_a:hover]:underline [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[#1d1d1f] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                {s.body}
              </div>
            </section>
          ))}
          <div className="rounded-[24px] bg-[#f5f5f7] p-7">
            <p className="text-[17px] font-semibold">Questions about this page?</p>
            <p className="mt-1 text-[15px] text-[#6e6e73]">Write to <a href="mailto:support@medicuslabs.app" className="text-[#0071e3] hover:underline">support@medicuslabs.app</a>.</p>
            <Link to={sibling.to} className="mt-4 inline-block text-[15px] text-[#0071e3] hover:underline">{sibling.label} <span aria-hidden="true">›</span></Link>
          </div>
        </article>
      </div>
      <PremiumFooter />
    </div>
  </>
);

export default LegalLayout;
