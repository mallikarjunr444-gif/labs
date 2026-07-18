import React from 'react';

// The individual pages (Home, Analysis, Features, FAQ, Contact, Dashboard) 
// already import and render <PremiumFooter /> themselves to preserve local layout
// and scroll structure. Therefore, the global Footer component is rendered as null 
// to prevent duplicate footers on these pages.
const Footer: React.FC = () => {
  return null;
};

export default Footer;
