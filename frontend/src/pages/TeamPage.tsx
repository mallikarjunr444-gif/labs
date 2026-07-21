import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const team = [
  { name: 'Mallikarjun R', role: 'Founder & CEO', focus: 'Vision, AI Product, Full Stack, Cloud & DevOps', linkedin: 'https://www.linkedin.com/in/mallikarjunr-com/', initials: 'MR' },
  { name: 'Nigam Patel H', role: 'Co-Founder', focus: 'Platform Strategy & Operations', linkedin: 'https://www.linkedin.com/in/nigam-patel-h-19668b383/', initials: 'NP' },
  { name: 'Mallanagouda M', role: 'Co-Founder', focus: 'Systems Architecture & Infrastructure', linkedin: 'https://www.linkedin.com/in/mallanagouda-m-93b52938b/', initials: 'MM' },
  { name: 'Mohammed Adil', role: 'Co-Founder', focus: 'Product Engineering & Clinical AI Workflows', linkedin: 'https://www.linkedin.com/in/mohammed-adil-b737ab388/', initials: 'MA' },
];

const teamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://medicuslabs.app/team#webpage",
      "url": "https://medicuslabs.app/team",
      "name": "Co-Founders of Medicus Labs | Leadership & Founding Team",
      "description": "Meet the co-founders of Medicus Labs: Mallikarjun R (Founder & CEO), Nigam Patel H (Co-Founder), Mallanagouda M (Co-Founder), and Mohammed Adil (Co-Founder)."
    },
    {
      "@type": "Organization",
      "@id": "https://medicuslabs.app/#organization",
      "name": "Medicus Labs",
      "url": "https://medicuslabs.app/",
      "logo": "https://medicuslabs.app/og-image.png",
      "founder": team.map(m => ({
        "@type": "Person",
        "name": m.name,
        "jobTitle": m.role,
        "worksFor": {
          "@type": "Organization",
          "name": "Medicus Labs"
        },
        "sameAs": m.linkedin
      }))
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who are the co-founders of Medicus Labs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The co-founders of Medicus Labs are Mallikarjun R (Founder & CEO), Nigam Patel H (Co-Founder), Mallanagouda M (Co-Founder), and Mohammed Adil (Co-Founder)."
          }
        },
        {
          "@type": "Question",
          "name": "Who founded Medicus Labs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Medicus Labs was founded by Mallikarjun R (Founder & CEO) along with co-founders Nigam Patel H, Mallanagouda M, and Mohammed Adil."
          }
        }
      ]
    }
  ]
};

const TeamPage: React.FC = () => (
  <>
    <SEO
      title="Co-Founders of Medicus Labs | Leadership Team"
      description="Meet the co-founders of Medicus Labs: Mallikarjun R (Founder & CEO), Nigam Patel H (Co-Founder), Mallanagouda M (Co-Founder), and Mohammed Adil (Co-Founder)."
      canonical="https://medicuslabs.app/team"
    />
    
    {/* Injected Schema.org JSON-LD for Google Search Knowledge Graph */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />

    <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="Medicus Labs" />
      <meta itemProp="url" content="https://medicuslabs.app/" />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles size={12} /> Leadership & Founding Team
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141515] mb-4">
          Co-Founders of Medicus Labs
        </h1>
        <p className="text-[#5A554A] text-base sm:text-lg mb-16 max-w-2xl mx-auto">
          Meet the engineers, AI researchers, and product visionaries behind Medicus Labs (medicuslabs.app).
        </p>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-3xl bg-white border border-[#E5E2DA] text-left space-y-6 shadow-sm hover:border-[#206E55] transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              itemProp="founder"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F2ED] text-[#206E55] font-extrabold flex items-center justify-center text-xl border-2 border-[#206E55]/20">
                  {m.initials}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#141515]" itemProp="name">{m.name}</h2>
                  <p className="text-xs font-bold text-[#206E55]" itemProp="jobTitle">{m.role}</p>
                </div>
              </div>
              <p className="text-[#5A554A] text-xs leading-relaxed font-semibold pt-2 border-t border-slate-100">
                {m.focus}
              </p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="sameAs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F2ED] text-[#206E55] hover:bg-[#206E55] hover:text-white font-bold text-xs transition"
              >
                <LinkedinIcon size={14} /> LinkedIn Profile <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Structured SEO Q&A for Co-Founders Search Queries */}
        <div className="mt-20 max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-[#E5E2DA] text-left">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-[#206E55]" size={24} />
            <h3 className="text-xl font-bold text-[#141515]">About the Medicus Labs Founding Team</h3>
          </div>
          <p className="text-sm text-[#5A554A] leading-relaxed mb-4">
            <strong>Medicus Labs</strong> was co-founded by <strong>Mallikarjun R</strong> (Founder & CEO), <strong>Nigam Patel H</strong> (Co-Founder), <strong>Mallanagouda M</strong> (Co-Founder), and <strong>Mohammed Adil</strong> (Co-Founder). Together, the team builds clinical-grade AI dermatology solutions empowering patients and healthcare professionals globally.
          </p>
          <p className="text-xs text-[#8A857A]">
            Official leadership registry for Medicus Labs (medicuslabs.app). Verified on LinkedIn.
          </p>
        </div>
      </section>

      <PremiumFooter />
    </div>
  </>
);

export default TeamPage;