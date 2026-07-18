import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Heart, Users, Target, Activity } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';

const LinkedInIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: size, height: size }}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type TeamMember = {
  name: string;
  role: string;
  linkedin: string;
  bio: string;
};

const About: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: 'Mallikarjun R',
      role: 'Founder & Lead Architect',
      linkedin: 'https://www.linkedin.com/in/mallikarjunr-com/',
      bio: 'Visionary engineer focusing on deep learning applications in healthcare and scalable cloud architectures.',
    },
    {
      name: 'Nigam Patel',
      role: 'AI Research Engineer',
      linkedin: 'https://www.linkedin.com/in/nigam-patel-h-19668b383/',
      bio: 'Machine learning specialist dedicated to computer vision, medical imaging classification, and model optimization.',
    },
    {
      name: 'Mohammed Adil',
      role: 'Frontend Architect',
      linkedin: 'https://www.linkedin.com/in/mohammed-adil-b737ab388/',
      bio: 'Expert UI/UX designer and developer building high-fidelity, accessible, and performant web interfaces.',
    },
    {
      name: 'Mallanagouda M',
      role: 'Backend & Systems Engineer',
      linkedin: 'https://www.linkedin.com/in/mallanagouda-m-93b52938b/',
      bio: 'Backend systems engineer designing highly secure, compliant, and performant clinical data storage pipelines.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-sky-500/10 selection:text-sky-900">
      <PremiumNavbar />

      <main className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Ambient page glow */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] bg-gradient-to-tr from-sky-500/5 to-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Banner */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200/60">
            <div className="absolute inset-0">
              <img src="/media/hero-man-bench.jpg" alt="Medicus Labs Mission" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/75 mix-blend-multiply" />
            </div>
            <div className="relative z-10 py-20 px-8 text-center sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-xs font-semibold text-sky-300 tracking-wider uppercase mb-4">
                  Our Mission & Team
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">Medicus Labs</span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                  We are building modern, accessible artificial intelligence systems to assist dermatology screenings and clinical workflows globally.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Mission & Purpose Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Target,
                title: 'Our Purpose',
                desc: 'To provide fast, reliable, and accessible preliminary dermatology assessments using state-of-the-art vision models.',
              },
              {
                icon: Brain,
                title: 'Responsible AI',
                desc: 'Adhering strictly to clinical validation standards and continuous assessment metrics to optimize prediction safety.',
              },
              {
                icon: Heart,
                title: 'Patient-First Focus',
                desc: 'Ensuring end-to-end data encryption and complete patient transparency to safeguard medical privacy.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-sky-300 transition-all duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Our Care Standard Section */}
          <motion.div
            className="mb-16 p-8 rounded-3xl bg-amber-50/50 border border-amber-200/80 shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-amber-900 mb-2">Our Care Standard</h2>
                <p className="text-amber-800 text-sm sm:text-base leading-relaxed font-medium">
                  Medicus Labs is built with responsible AI boundaries. It is not a diagnosis engine, not an emergency service, and not a replacement for a dermatologist. If a skin spot is changing, painful, bleeding, spreading quickly, or causing serious concern, users should contact a licensed medical professional promptly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <div className="mb-8 text-center">
            <span className="text-sky-600 font-extrabold text-xs tracking-wider uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              The Innovators
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2">Meet Our Team</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto font-medium">
              The engineers, designers, and researchers building the future of AI-powered dermatology.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-extrabold text-base mb-4 border border-slate-200">
                  {member.name
                    .split(' ')
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join('')}
                </div>

                <h3 className="font-bold text-slate-800 text-base mb-0.5">{member.name}</h3>
                <span className="text-xs text-sky-600 font-bold mb-3 block">{member.role}</span>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 font-medium">{member.bio}</p>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors pt-4 border-t border-slate-50"
                >
                  <LinkedInIcon size={14} />
                  Connect on LinkedIn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default About;
