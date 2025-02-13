import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const routeLabels: Record<string, string> = {
  brands: 'מותגים',
  apps: 'אפליקציות',
  agencies: 'סוכנויות',
  guides: 'מדריכים',
  about: 'אודות',
  contact: 'צור קשר'
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 space-x-reverse text-sm" aria-label="Breadcrumb">
      <Link to="/" className="text-gray-500 hover:text-gray-700">
        ראשי
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <ChevronLeft className="h-4 w-4 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link to={item.path} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function useBreadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = routeLabels[segment] || segment;
    return { path, label };
  });

  return breadcrumbs;
}