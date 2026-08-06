import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#8A857A] font-medium">
      <Link to="/" className="flex items-center gap-1 hover:text-[#206E55] transition">
        <Home size={13} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={12} className="text-[#C5C2B8]" />
          {item.href ? (
            <Link to={item.href} className="hover:text-[#206E55] transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#206E55] font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
