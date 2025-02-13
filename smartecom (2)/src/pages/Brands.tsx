import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredBrands } from '../data/mockData';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Brands() {
  const breadcrumbs = useBreadcrumbs();
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 9;

  // Calculate pagination
  const totalPages = Math.ceil(featuredBrands.length / brandsPerPage);
  const startIndex = (currentPage - 1) * brandsPerPage;
  const displayedBrands = featuredBrands.slice(startIndex, startIndex + brandsPerPage);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-extrabold text-gray-900">מותגים מובילים</h1>
            <Link 
              to="/submit-brand"
              className="button-primary"
            >
              הוסף את המותג שלך
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedBrands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/brands/${brand.id}`}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <img src={brand.logo} alt={brand.name} className="h-16 w-16 rounded-full" />
                  <h3 className="mr-3 text-xl font-medium text-gray-900">{brand.name}</h3>
                </div>
                <p className="text-gray-500 mb-4">{brand.description}</p>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">אפליקציות בשימוש:</h4>
                  <ul className="space-y-1">
                    {brand.apps.map((app) => (
                      <li key={app.id} className="text-sm text-gray-600">• {app.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            <span className="text-sm font-medium">
              עמוד {currentPage} מתוך {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}