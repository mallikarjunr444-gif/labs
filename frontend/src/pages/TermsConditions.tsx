import React from 'react';
import { Link } from 'react-router-dom';
import LegalLayout, { LegalSection } from '../components/LegalLayout';

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Agreeing to these terms',
    body: (
      <>
        <p>These Terms &amp; Conditions govern your use of Medicus Labs, including the website at medicuslabs.app, the AI skin analysis, the symptom chat, reports and the health library (together, the "Service"). By using the Service you agree to these terms and to our <Link to="/privacy-policy">Privacy Policy</Link>. If you do not agree, please do not use the Service.</p>
        <p>You must be at least 18 years old to use the Service. If you are younger, a parent or legal guardian must use it with you and accepts these terms on your behalf.</p>
      </>
    ),
  },
  {
    id: 'not-medical-advice',
    title: 'Not medical advice',
    body: (
      <>
        <p>Medicus Labs provides <strong>information and a reference reading</strong> for education. It is not a medical device, it does not diagnose, treat or prevent any condition, and it does not create a doctor-patient relationship.</p>
        <ul>
          <li>Results are estimates produced by software and can be wrong, including missing a serious condition.</li>
          <li>Never delay or skip professional care because of something you read or received here.</li>
          <li>See a qualified doctor for any skin change that is new, growing, bleeding, painful, changing colour or shape, or that worries you.</li>
          <li>In an emergency, contact your local emergency number or go to the nearest hospital.</li>
        </ul>
        <p>See also our <Link to="/disclaimer">Medical Disclaimer</Link>.</p>
      </>
    ),
  },
  {
    id: 'your-use',
    title: 'Your responsibilities',
    body: (
      <ul>
        <li>Give accurate information and clear, well-lit images where asked.</li>
        <li>Upload only images of yourself, or of a person who has given you clear permission (or a child you are the guardian of).</li>
        <li>Do not upload unlawful, obscene or unrelated content.</li>
        <li>Keep your sign-in details secure. You are responsible for activity on your account.</li>
        <li>Use the Service only for lawful, personal, non-commercial purposes unless we agree otherwise in writing.</li>
      </ul>
    ),
  },
  {
    id: 'prohibited',
    title: 'What you may not do',
    body: (
      <ul>
        <li>Present a Medicus Labs report as a medical record, prescription or certificate issued by a doctor.</li>
        <li>Alter reports, or use the Service to create false or misleading medical documents.</li>
        <li>Probe, scan or test the Service for weaknesses, or interfere with its security or availability.</li>
        <li>Scrape, copy, reverse-engineer or use the Service to train another model.</li>
        <li>Resell or redistribute the Service or its reports without written permission.</li>
      </ul>
    ),
  },
  {
    id: 'content',
    title: 'Your content and our content',
    body: (
      <>
        <p>You keep ownership of what you submit. You give us a limited licence to process it only to provide the Service to you, as described in the Privacy Policy.</p>
        <p>The Medicus Labs name, design, software, models and written content belong to Medicus Labs or its licensors and are protected by law. You may view and share pages for personal use, but you may not copy or reuse them commercially without permission.</p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-party services and links',
    body: (
      <>
        <p>The Service links to or relies on services we do not control, such as clinic listings, telehealth providers, advertising partners and AI model providers. We do not endorse them and are not responsible for their content, availability or practices. Any appointment or purchase you make is between you and that provider.</p>
        <p>Some pages show advertisements or sponsored links, which are labelled as such. Advertising never influences an analysis result.</p>
      </>
    ),
  },
  {
    id: 'availability',
    title: 'Availability and changes',
    body: (
      <p>We work to keep the Service running but do not promise it will always be available or error-free. We may change, pause or stop any part of it, and we may suspend access if these terms are broken.</p>
    ),
  },
  {
    id: 'liability',
    title: 'Disclaimers and limits of liability',
    body: (
      <>
        <p>The Service is provided "as is" and "as available". To the fullest extent permitted by law, we do not give warranties of accuracy, completeness or fitness for a particular purpose.</p>
        <p>To the fullest extent permitted by law, Medicus Labs and its team are not liable for indirect, incidental or consequential loss, for decisions or treatment based on a result, or for loss caused by third-party services. Nothing in these terms limits liability that cannot be limited by law.</p>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction over disputes, subject to any rights you have under mandatory consumer law where you live.</p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>We may update these terms as the Service changes. The date at the top shows the latest version. If a change is significant, we will say so on this page. Using the Service after a change means you accept it.</p>
    ),
  },
];

const TermsConditions: React.FC = () => (
  <LegalLayout
    seoTitle="Terms & Conditions | Medicus Labs"
    seoDescription="The terms for using Medicus Labs: what the service is and is not, your responsibilities, and how we limit liability."
    title="Terms & Conditions"
    updated="November 9, 2026"
    intro="The ground rules for using Medicus Labs. The short version: it is a reference tool, not a doctor."
    sections={sections}
    sibling={{ to: '/privacy-policy', label: 'Read the Privacy Policy' }}
  />
);

export default TermsConditions;
