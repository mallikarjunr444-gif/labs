import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, HeartPulse, Mail, Scale, ShieldCheck, Users } from 'lucide-react';
import PremiumNavbar from '../components/PremiumNavbar';
import { PremiumFooter } from '../sections';
import AdSpace from '../components/AdSpace';

type PublicInfoPageType = 'about' | 'privacy' | 'terms' | 'disclaimer';

type InfoSection = {
  title: string;
  body: string;
  bullets?: string[];
};

type PublicInfoContent = {
  eyebrow: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  updated: string;
  highlights: string[];
  sections: InfoSection[];
};

const content: Record<PublicInfoPageType, PublicInfoContent> = {
  about: {
    eyebrow: 'About Us',
    title: 'About Medicus Labs',
    summary:
      'Medicus Labs is a healthcare technology project focused on making AI-powered dermatological assistance accessible to everyone. Our goal is to provide a reliable, user-friendly tool for preliminary skin health guidance, available directly from your browser with no app installation required.',
    icon: Users,
    updated: 'June 23, 2024',
    highlights: [
      'Pioneering AI for accessible skin health',
      'Public, browser-based access with no app install',
      'AI assistance for skin images, symptoms, and reports',
    ],
    sections: [
      {
        title: 'Our Mission',
        body:
          'Our mission is to make preliminary skin-health guidance accessible to everyone. We believe that by providing a clear, reliable, and user-friendly first-contact tool, we can empower individuals to act early, stay informed, and engage more effectively with healthcare professionals. Medicus Labs works directly from your browser, putting powerful AI assistance in your hands without forcing you to install a separate app.',
        bullets: [],
      },
      {
        title: 'The Challenge We Address',
        body:
          'Access to specialized dermatological support is often unevenly distributed. Consultations can be expensive, and many people face long waits for specialist care, allowing concerns to worsen. Medicus Labs is designed to bridge this gap, helping users organize their symptoms, skin images, and report information so they are better prepared when they speak with a qualified healthcare professional.',
        bullets: [],
      },
      {
        title: 'Core Contributors',
        body: 'Medicus Labs was brought to life by a dedicated team of engineers and researchers committed to enhancing dermatological care through AI innovation. The project\'s development was guided by the Department of Computer Science and Engineering.',
        bullets: [
          '<a href="https://www.linkedin.com/in/mallikarjun-r-a85685367?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">Mallikarjun R.</a>',
          '<a href="https://www.linkedin.com/in/nigam-patel-h-19668b383?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">Nigam Patel H</a>',
          '<a href="https://www.linkedin.com/in/mallanagouda-m-93b52938b?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">Mallanagouda M.</a>',
          '<a href="https://www.linkedin.com/in/mohammed-adil-b737ab388?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">Mohammed Adil</a>',
        ],
      },
      {
        title: 'What We Provide',
        body:
          'Medicus Labs provides AI-assisted skin image review, symptom-based information support, and downloadable health-report workflows. Our goal is to help users understand possible next steps and prepare better questions for doctors.',
        bullets: [
          'Skin image analysis for supported categories such as acne, eczema, psoriasis, melanoma, and more.',
          'Plain-language explanations and confidence scoring to help users understand uncertainty.',
          'Downloadable reports that can be shared with a doctor, clinic, or care provider.',
        ],
      },
       {
        title: 'Technology Foundation',
        body:
          'Medicus Labs is built on a multi-modal architecture combining computer vision and large language models. Our technology stack includes a React and TypeScript frontend, FastAPI AI services, and secure cloud infrastructure.',
        bullets: [
          'Our training corpus combines public dermatology datasets including HAM10000, ISIC, and DermNet.',
          'The underlying models achieved a high weighted F1-score of 0.913 across seven skin-disease classes during evaluation.',
          'The platform is optimized for fast response times, with core workflows performing in under 3 seconds.',
        ],
      },
      {
        title: 'Our Care Standard',
        body:
          'Medicus Labs is built with responsible AI boundaries. It is not a diagnosis engine, not an emergency service, and not a replacement for a dermatologist. If a skin spot is changing, painful, bleeding, spreading quickly, or causing serious concern, users should contact a licensed medical professional promptly.',
          bullets: [],
      },
    ],
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'How Medicus Labs Handles Your Data',
    summary:
      'This Privacy Policy explains what information may be collected, how it is used, and the choices users have when using Medicus Labs.',
    icon: ShieldCheck,
    updated: 'June 23, 2026',
    highlights: [
      'Explains health-image and contact data use',
      'Includes Google AdSense cookie disclosure',
      'Supports public review and transparent navigation',
    ],
    sections: [
      {
        title: 'Information we collect',
        body:
          'When you use Medicus Labs, we may collect information you choose to provide. This can include your name, age, gender, mobile number, email address, uploaded skin images, uploaded report files, analysis requests, messages submitted through the contact form, and any other details you voluntarily enter into the platform.',
        bullets: [
          'Uploaded files may include sensitive health-related information. Please upload only files that you have the right to use and want processed by the service.',
          'Technical information may include browser type, device information, IP address, pages visited, timestamps, error logs, and approximate usage metrics.',
          'If accounts or dashboards are enabled, the service may store analysis history and generated report references for user access.',
        ],
      },
      {
        title: 'How we use information',
        body:
          'We use information to operate the analysis workflow, validate uploaded images, generate result pages or reports, respond to support messages, improve user experience, maintain security, detect abuse, troubleshoot service issues, and understand how the site is being used.',
        bullets: [
          'Uploaded images are used to generate the requested analysis.',
          'Contact details may be used to send reports or respond to inquiries.',
          'Technical data may be used to protect the service and improve reliability.',
          'Aggregate usage statistics may be used to improve performance, accessibility, and content quality.',
        ],
      },
      {
        title: 'Cookies, analytics, and Google AdSense',
        body:
          'Medicus Labs may use cookies, local storage, analytics tools, and advertising services to keep the site functional, measure traffic, and. If Google AdSense or other Google advertising products are enabled, third parties including Google may place and read cookies on users browsers, use web beacons, IP addresses, or other identifiers, and collect information as a result of ad serving on this website.',
        bullets: [
          'Users can manage cookies through browser settings and Google ad personalization controls.',
          'We do not intentionally use health images or medical details to target personalized advertising.',
          'We aim not to send personally identifiable health details to Google ad requests.',
          'Google explains partner-site data use at: How Google uses data when you use our partners sites or apps.',
        ],
      },
      {
        title: 'Data sharing',
        body:
          'We do not sell user health information. Information may be shared only when needed to operate hosting, storage, analytics, security, email, AI-processing, or support workflows; when required by law; or when necessary to protect users, the platform, or the public.',
        bullets: [
          'Service providers may process information only for platform operations such as hosting, storage, report generation, or support delivery.',
          'External AI or infrastructure services may process uploaded content when required to produce requested features.',
          'Public pages such as About, Contact, Privacy Policy, Terms & Conditions, and Disclaimer do not require login.',
        ],
      },
      {
        title: 'Data protection',
        body:
          'The project documentation describes security practices such as HTTPS, JWT authentication concepts, password hashing, CORS allowlists, MIME-type validation, upload-size limits, private storage buckets, signed URL access, and environment-variable management for API keys. No online service can guarantee absolute security, so users should avoid uploading information they do not want processed by the service.',
      },
      {
        title: 'Children and sensitive information',
        body:
          'Medicus Labs is not directed to children under 13. Minors should use the platform only with parent or guardian involvement. Because skin images and medical information can be sensitive, users should avoid uploading someone else skin image or report without permission.',
      },
      {
        title: 'Retention and deletion',
        body:
          'Information may be retained for as long as needed to provide the service, maintain security, comply with legal obligations, resolve disputes, or improve platform reliability. Users may contact Medicus Labs to request deletion or correction where applicable.',
      },
      {
        title: 'Your choices',
        body:
          'Users may contact Medicus Labs to ask questions about their information, request support, request deletion, update contact details, or ask how uploaded information is processed. Browser privacy settings can also be used to block or delete cookies.',
      },
    ],
  },
  terms: {
    eyebrow: 'Terms & Conditions',
    title: 'Rules for Using Medicus Labs',
    summary:
      'These Terms & Conditions describe the basic rules that apply when public users access or use Medicus Labs.',
    icon: Scale,
    updated: 'June 23, 2026',
    highlights: [
      'Public terms for website visitors',
      'Medical-use boundaries are clearly stated',
      'Covers uploads, ads, accounts, and acceptable use',
    ],
    sections: [
      {
        title: 'Acceptance of terms',
        body:
          'By accessing or using Medicus Labs, you agree to these Terms & Conditions and agree to use the platform responsibly. If you do not agree, please do not use the website, upload files, submit contact forms, or rely on any platform output.',
      },
      {
        title: 'Nature of the service',
        body:
          'Medicus Labs provides informational, AI-assisted dermatology awareness tools. The platform may support skin image uploads, symptom information, report-generation concepts, educational recommendations, and public content pages. It does not provide a final medical diagnosis, prescription, doctor-patient relationship, or emergency response.',
      },
      {
        title: 'Permitted use',
        body:
          'You may use the platform to upload appropriate skin images, receive AI-assisted informational results, generate reports, read public information pages, and contact support.',
        bullets: [
          'Do not upload unlawful, abusive, misleading, or non-consensual content.',
          'Do not attempt to reverse engineer, overload, or disrupt the service.',
          'Do not rely on the platform as your only source of medical advice.',
          'Do not submit images or reports belonging to another person unless you have permission.',
          'Do not use the contact form for spam, harassment, fraudulent requests, or promotional abuse.',
        ],
      },
      {
        title: 'Medical responsibility',
        body:
          'Medicus Labs does not replace a doctor, dermatologist, clinic, emergency service, or licensed healthcare provider. Users are responsible for seeking professional care when symptoms are urgent or uncertain.',
      },
      {
        title: 'User uploads and content',
        body:
          'You are responsible for the files and information you submit. By uploading content, you confirm that you have the right to submit it and allow Medicus Labs to process it for the requested analysis, validation, reporting, support, and security purposes.',
      },
      {
        title: 'Advertising and monetization',
        body:
          'If ads are displayed, they must be presented in a way that is distinguishable from site content and does not mislead users. Users must not click ads fraudulently, encourage others to click ads, or use automated methods to inflate ad impressions or clicks.',
      },
      {
        title: 'Accounts, access, and availability',
        body:
          'Some features may require login or may change over time. We may update, pause, limit, or remove features to improve reliability, protect users, comply with law or policy, or prevent abuse. We do not guarantee uninterrupted access.',
      },
      {
        title: 'Intellectual property',
        body:
          'Medicus Labs branding, interface design, text, reports, and software elements are protected by applicable intellectual-property laws unless otherwise stated. Public datasets, third-party services, libraries, and referenced tools remain owned by their respective rights holders.',
      },
      {
        title: 'Limitation of liability',
        body:
          'To the maximum extent permitted by law, Medicus Labs is not liable for decisions made solely based on AI output, delays in seeking care, inaccurate uploads, service interruptions, data loss, or indirect damages. Always consult a qualified professional for medical concerns.',
      },
      {
        title: 'Service changes',
        body:
          'Features, supported conditions, availability, and analysis behavior may change over time as the platform improves.',
      },
    ],
  },
  disclaimer: {
    eyebrow: 'Disclaimer',
    title: 'Important Medical Disclaimer',
    summary:
      'Medicus Labs is an informational AI assistance tool. It is not a medical device, diagnostic service, emergency service, or substitute for professional clinical judgment.',
    icon: AlertTriangle,
    updated: 'June 23, 2026',
    highlights: [
      'Not a diagnosis or emergency service',
      'AI results can be wrong or incomplete',
      'Professional medical care remains essential',
    ],
    sections: [
      {
        title: 'Not a diagnosis',
        body:
          'AI results may be incomplete, inaccurate, or affected by image quality, lighting, skin tone, angle, and the condition shown. Only a qualified healthcare professional can provide a diagnosis and treatment plan.',
      },
      {
        title: 'Known limitations',
        body:
          'The project reports acknowledge several limitations that users should understand before relying on any output. These include dependence on photo quality, limited supported disease scope, dataset imbalance, possible under-representation of darker Fitzpatrick skin types, English-only output in the current project scope, internet dependency, and possible hallucination from generative AI guidance.',
        bullets: [
          'Poor lighting, blur, shadows, low resolution, or unclear framing can produce misleading results.',
          'Conditions outside supported categories may be classified incorrectly or with low confidence.',
          'AI-generated recommendations must be reviewed with a qualified healthcare professional before action.',
        ],
      },
      {
        title: 'When to seek care',
        body:
          'Seek medical care immediately if you notice rapid changes, severe pain, bleeding, infection signs, fever, spreading rash, breathing difficulty, or any symptom that feels urgent.',
      },
      {
        title: 'Use with professional guidance',
        body:
          'Reports and recommendations from Medicus Labs should be treated as supporting information for a conversation with a healthcare professional.',
      },
      {
        title: 'No emergency support',
        body:
          'Medicus Labs does not provide emergency monitoring or emergency response. In an emergency, contact local emergency services immediately.',
      },
      {
        title: 'Advertising disclaimer',
        body:
          'Advertisements, sponsored links, or third-party content displayed on the site, if any, do not represent medical endorsement by Medicus Labs. Ad content should not be treated as healthcare advice.',
      },
    ],
  },
};

export const publicInfoLinks = [
  { label: 'About Us', to: '/about', description: 'Project background, mission, technology stack, dataset summary, and responsible AI goals.', icon: Users },
  { label: 'Contact Us', to: '/contact', description: 'Public support page for questions, feedback, privacy requests, and platform help.', icon: Mail },
  { label: 'Privacy Policy', to: '/privacy-policy', description: 'Details on uploaded images, contact data, cookies, analytics, Google AdSense, and user choices.', icon: ShieldCheck },
  { label: 'Terms & Conditions', to: '/terms-conditions', description: 'Rules for using the website, uploads, reports, ads, accounts, and acceptable conduct.', icon: FileText },
  { label: 'Disclaimer', to: '/disclaimer', description: 'Medical limitations, AI uncertainty, emergency guidance, known model limits, and ad disclaimers.', icon: HeartPulse },
];

type PublicInfoPageProps = {
  type: PublicInfoPageType;
};

const PublicInfoPage: React.FC<PublicInfoPageProps> = ({ type }) => {
  const page = content[type];
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PremiumNavbar />

      <main className="relative overflow-hidden break-words pt-24 sm:pt-28">
        <section className="relative px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_70%)]" />
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 sm:mb-6 sm:h-12 sm:w-12">
                <Icon size={24} />
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">{page.eyebrow}</p>
              <h1 className="font-display text-3xl font-bold leading-tight text-slate-950 sm:text-4xl md:text-5xl">{page.title}</h1>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 md:text-lg md:leading-8">{page.summary}</p>
              <p className="mt-5 text-sm font-semibold text-slate-500">Last updated: {page.updated}</p>
              <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3">
                {page.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm">
                    <p className="text-sm font-semibold leading-6 text-slate-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_280px]">
            <div className="space-y-5">
              {page.sections.map((section, index) => (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.45 }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-8"
                >
                  <h2 className="text-xl font-bold text-slate-950">{section.title}</h2>
                  <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
                  {section.bullets && (
                    <ul className="mt-4 space-y-3 text-slate-600">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-sky-500" />
                          <span className="leading-7" dangerouslySetInnerHTML={{ __html: bullet }}></span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>

            <aside className="order-first h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-28 lg:order-none">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">Public Pages</h2>
              <nav className="mt-4 grid gap-2">
                {publicInfoLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-sky-700"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Sidebar 160x300 Halfpage Ad */}
              <div className="mt-6 pt-6 border-t border-slate-200 text-center flex justify-center">
                <AdSpace variant="halfpage" />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
};

export default PublicInfoPage;
