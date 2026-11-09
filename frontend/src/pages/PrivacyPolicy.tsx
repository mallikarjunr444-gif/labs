import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '../components/LegalLayout';

const sections: LegalSection[] = [
  {
    id: 'summary',
    title: 'The short version',
    body: (
      <ul>
        <li>We collect only what is needed to give you a result and a report.</li>
        <li>We do not sell your personal data.</li>
        <li>Skin images and symptom text are never shared with advertisers or used to build ad profiles.</li>
        <li>You can ask us to access, correct or delete your data at any time.</li>
      </ul>
    ),
  },
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <ul>
        <li><strong>Information you give us:</strong> details you enter for an analysis (such as age, gender and symptoms), your name, email address and phone number if you sign in, subscribe or contact us, and messages you send.</li>
        <li><strong>Photos you upload:</strong> skin images submitted for analysis.</li>
        <li><strong>Technical information:</strong> device and browser type, approximate location from your network address, pages visited, scan time and processing metrics, collected through standard logs and cookies.</li>
        <li><strong>Optional location:</strong> if you use "Find Doctors" and allow it, your device location to show nearby clinics. You can decline and search by city instead.</li>
      </ul>
    ),
  },
  {
    id: 'use',
    title: 'How we use it',
    body: (
      <ul>
        <li>To run the analysis and symptom chat and to produce your report.</li>
        <li>To create and secure your account.</li>
        <li>To send the newsletter or updates you asked for. You can unsubscribe at any time.</li>
        <li>To keep the Service secure, fix problems and understand which pages are useful.</li>
        <li>To meet legal obligations.</li>
      </ul>
    ),
  },
  {
    id: 'images',
    title: 'How we handle your images',
    body: (
      <>
        <p>Images are sent over an encrypted connection and processed to produce your result. Our design goal is not to keep your uploaded skin images after the analysis finishes, and we do not use them to train models or for advertising.</p>
        <p>Text you type into the symptom chat is passed to our AI model provider to generate a reply. Please do not include information you would not want processed this way, such as government ID numbers.</p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Who we share data with',
    body: (
      <>
        <p>We do not sell or rent personal data. We share it only with:</p>
        <ul>
          <li><strong>Service providers</strong> who help us run the Service, such as hosting, authentication and AI model providers, under terms that limit their use of your data to providing that service.</li>
          <li><strong>Authorities</strong> where the law requires it, or to protect someone's safety.</li>
          <li><strong>A new owner</strong> if the business is ever transferred, with the same protections.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'ads',
    title: 'Advertising and cookies',
    body: (
      <>
        <p>We use essential cookies to keep you signed in and the site working, and analytics to understand usage. Some pages show ads served by Google AdSense. Google and other vendors may use cookies to show ads based on your earlier visits to this and other sites.</p>
        <ul>
          <li>You can opt out of personalised ads at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
          <li>You can block or delete cookies in your browser settings. Some features may stop working.</li>
          <li>Uploaded images, symptom text and analysis results are never shared with advertising vendors.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>We use encryption in transit (HTTPS), access controls and reputable infrastructure providers to protect your data. No online service can promise perfect security, so please use a strong, unique password and tell us straight away if you suspect misuse of your account.</p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep data',
    body: (
      <ul>
        <li>Account and subscription details are kept while your account or subscription is active, then deleted or anonymised within a reasonable period after you close it or unsubscribe.</li>
        <li>Basic server logs are kept for a short period for security and troubleshooting.</li>
        <li>We may keep limited records longer where the law requires.</li>
      </ul>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights and choices',
    body: (
      <>
        <p>Under India's Digital Personal Data Protection Act, 2023, and similar laws such as the GDPR and CCPA where they apply, you can ask us to:</p>
        <ul>
          <li>Tell you what personal data we hold about you and give you a copy.</li>
          <li>Correct inaccurate data.</li>
          <li>Delete your data and close your account.</li>
          <li>Withdraw consent, for example to marketing emails or location use.</li>
          <li>Respond to a concern or complaint about how your data is handled.</li>
        </ul>
        <p>Email <a href="mailto:support@medicuslabs.app">support@medicuslabs.app</a> from the address linked to your account. We will reply within a reasonable time, and no later than the law requires.</p>
      </>
    ),
  },
  {
    id: 'children',
    title: "Children's privacy",
    body: (
      <p>The Service is for adults. We do not knowingly collect data from anyone under 18 without a parent or guardian's involvement. If you believe a child has used the Service on their own, contact us and we will delete the data.</p>
    ),
  },
  {
    id: 'transfers',
    title: 'Where data is processed',
    body: (
      <p>Our providers may process data in countries other than your own. Where that happens, we rely on providers that protect data to a comparable standard.</p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes and contact',
    body: (
      <>
        <p>We will update this policy when our practices change and show the new date at the top. For significant changes we will add a notice on the site.</p>
        <p>Contact: <a href="mailto:support@medicuslabs.app">support@medicuslabs.app</a>. See also our <Link to="/terms-conditions">Terms &amp; Conditions</Link>.</p>
      </>
    ),
  },
];

const PrivacyPolicy: React.FC = () => (
  <LegalLayout
    seoTitle="Privacy Policy | Medicus Labs"
    seoDescription="How Medicus Labs collects, uses and protects your information, including skin images, and the choices and rights you have."
    title="Privacy Policy"
    updated="November 9, 2026"
    intro="What we collect, why, who sees it, and how you stay in control. Your skin images are never used for advertising."
    sections={sections}
    sibling={{ to: '/terms-conditions', label: 'Read the Terms & Conditions' }}
  />
);

export default PrivacyPolicy;
