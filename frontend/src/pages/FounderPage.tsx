import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, ExternalLink, BookOpen, Cpu, Cloud, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PremiumFooter } from '../sections';
import SEO from '../components/SEO';

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FounderPage: React.FC = () => {
  return (
    <>
      <SEO title="Mallikarjun R - Founder & CEO of Medicus Labs" description="Mallikarjun R is the Founder & CEO of Medicus Labs. AI engineer, full-stack developer, and cloud architect building clinical-grade AI dermatology." />
      <div className="min-h-screen bg-[#FAF9F5] text-[#141515] pt-32 selection:bg-[#206E55]/20 font-sans">
        
        {/* ProfilePage JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2026-07-20",
            "mainEntity": {
              "@type": "Person",
              "name": "Mallikarjun R",
              "alternateName": "Mallikarjun R",
              "givenName": "Mallikarjun",
              "familyName": "R",
              "description": "Founder & CEO of Medicus Labs. AI product builder, full-stack engineer, and cloud architect democratizing clinical-grade skin intelligence through ethical AI.",
              "image": "https://medicuslabs.ai/media/mallikarjunr-founder.jpg",
              "url": "https://medicuslabs.ai/founder",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@type": "MedicalOrganization",
                "name": "Medicus Labs",
                "url": "https://medicuslabs.ai/"
              },
              "founderOf": {
                "@type": "MedicalOrganization",
                "name": "Medicus Labs",
                "url": "https://medicuslabs.ai/"
              },
              "sameAs": [
                "https://www.linkedin.com/in/mallikarjunr-com/",
                "https://github.com/mallikarjunr444-gif",
                "https://www.instagram.com/mallikarjunr_official/"
              ],
              "alumniOf": "",
              "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Computer Vision", "Dermatology", "Full-Stack Development", "Cloud Architecture", "DevOps"]
            }
          })}
        </script>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F2ED] border border-[#206E55]/20 text-[#206E55] text-xs font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                Founder & CEO
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#141515]"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              Mallikarjun R
            </motion.h1>
            <motion.p className="text-[#206E55] text-lg font-bold"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              Founder & CEO — Medicus Labs
            </motion.p>
            <motion.p className="text-[#5A554A] text-base sm:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              AI product builder, full-stack engineer, and cloud architect on a mission to democratize clinical-grade skin intelligence through ethical AI.
            </motion.p>
          </div>

          {/* Profile Card */}
          <div className="rounded-3xl bg-white border border-[#E5E2DA] p-8 sm:p-12 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#E8F2ED] to-[#206E55] text-white font-extrabold flex items-center justify-center text-5xl border-4 border-[#206E55]/20 shadow-lg flex-shrink-0">
                MR
              </div>
              <div className="space-y-5 flex-1">
                <h2 className="text-3xl font-bold text-[#141515]">Vision & Journey</h2>
                <p className="text-[#5A554A] text-sm leading-relaxed">
                  <strong>Mallikarjun R</strong> is the <strong>Founder & CEO of Medicus Labs</strong>. With deep expertise in AI product development, 
                  full-stack engineering, and cloud infrastructure, he identified a critical gap: billions of people worldwide lack 
                  immediate access to dermatological specialists. Medicus Labs was founded by Mallikarjun R to bridge this gap.
                </p>
                <p className="text-[#5A554A] text-sm leading-relaxed">
                  <strong>Medicus Labs</strong> was built from the ground up by <strong>Mallikarjun R</strong> combining Vision Transformer AI models, 
                  HIPAA-compliant privacy architecture, and physician-ready reporting into a single, accessible platform.
                  As <strong>Founder & CEO</strong>, he leads product vision, AI research, and technical architecture.
                </p>
                <p className="text-[#5A554A] text-sm leading-relaxed">
                  His work spans the entire stack — from training clinical AI models on 120,000+ dermatological images to 
                  building the cloud infrastructure that processes them securely in under 600ms. <strong>Mallikarjun R</strong> 
                  coded the initial platform prototype, trained the vision transformer models, and architected the HIPAA-compliant 
                  infrastructure himself.
                </p>
                
                {/* Social Links */}
                <div className="flex items-center flex-wrap gap-3 pt-4">
                  <a href="https://www.linkedin.com/in/mallikarjunr-com/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0077B5] text-white hover:bg-[#006396] font-bold text-xs transition shadow-sm">
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                  <a href="https://github.com/mallikarjunr444-gif" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24292E] text-white hover:bg-black font-bold text-xs transition shadow-sm">
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a href="https://www.instagram.com/mallikarjunr_official/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E4405F] text-white hover:bg-[#c13549] font-bold text-xs transition shadow-sm">
                    <InstagramIcon size={14} /> Instagram
                  </a>
                  <a href="mailto:medicuslabs.com@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#206E55] text-white hover:bg-[#408A6C] font-bold text-xs transition shadow-sm">
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Why Medicus Labs was Created */}
          <div className="rounded-3xl bg-[#F3F1EB] border border-[#E5E2DA] p-8 sm:p-10 shadow-sm mb-12">
            <h2 className="text-2xl font-bold text-[#141515] mb-4">Why Mallikarjun R Founded Medicus Labs</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: BookOpen, title: 'The Problem', desc: 'Over 3 billion people lack access to dermatologists. Long wait times and high costs prevent early skin issue detection.' },
                { icon: Cpu, title: 'The Solution', desc: 'Clinical-grade AI that analyzes skin photos in seconds — free, private, and accessible to anyone with a smartphone.' },
                { icon: Cloud, title: 'The Technology', desc: 'Vision Transformer models trained on 120K+ clinical cases, deployed on HIPAA-compliant infrastructure with AES-256 encryption.' },
                { icon: Code, title: 'The Mission', desc: 'Democratize clinical skin intelligence. Give everyone the power to understand their skin health before seeing a specialist.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E2DA] text-[#206E55] flex items-center justify-center flex-shrink-0"><Icon size={18} /></div>
                    <div><h3 className="font-bold text-sm text-[#141515]">{item.title}</h3><p className="text-xs text-[#5A554A] mt-1">{item.desc}</p></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'AI & Machine Learning', items: ['Vision Transformers', 'Deep Learning', 'Computer Vision', 'Model Training'] },
              { label: 'Full-Stack Development', items: ['React & TypeScript', 'Python & FastAPI', 'Node.js', 'PostgreSQL'] },
              { label: 'Cloud & DevOps', items: ['Docker & Kubernetes', 'AWS & GCP', 'CI/CD Pipelines', 'Infrastructure as Code'] },
            ].map((cat, idx) => (
              <motion.div key={idx} className="p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-sm space-y-3"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}>
                <h3 className="font-bold text-sm text-[#141515]">{cat.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, i) => (
                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E8F2ED] text-[#206E55]">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="p-10 rounded-3xl bg-[#206E55] text-center text-white space-y-4 shadow-lg">
            <h3 className="text-2xl font-bold">Built by Mallikarjun R for everyone</h3>
            <p className="text-white/80 text-sm max-w-xl mx-auto">Experience the platform — no account needed, completely free.</p>
            <Link to="/analysis">
              <button className="px-8 py-3.5 rounded-full bg-white text-[#206E55] font-extrabold text-sm hover:bg-[#E8F2ED] transition inline-flex items-center gap-2 shadow-md">
                Start Free Analysis <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </section>
        <PremiumFooter />
      </div>
    </>
  );
};

export default FounderPage;