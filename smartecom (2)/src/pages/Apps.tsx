import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredApps } from '../data/mockData';
import { Category, categoryLabels } from '../types';
import { ChevronDown, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';

export default function Apps() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const breadcrumbs = useBreadcrumbs();

  const itemsPerPage = 12;
  const filteredApps = selectedCategory
    ? featuredApps.filter(app => app.categories.includes(selectedCategory))
    : featuredApps;

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

  const FilterContent = () => (
    <div className="space-y-2">
      <button
        onClick={() => {
          setSelectedCategory(null);
          setIsFilterOpen(false);
          setCurrentPage(1);
        }}
        className={`w-full text-right px-4 py-2 rounded-lg text-sm font-medium ${
          !selectedCategory
            ? 'bg-black text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        הכל
      </button>
      {(Object.entries(categoryLabels) as [Category, string][]).map(([key, label]) => (
        <button
          key={key}
          onClick={() => {
            setSelectedCategory(key);
            setIsFilterOpen(false);
            setCurrentPage(1);
          }}
          className={`w-full text-right px-4 py-2 rounded-lg text-sm font-medium ${
            selectedCategory === key
              ? 'bg-black text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-4xl font-extrabold text-gray-900">אפליקציות וכלים</h1>
            
            {/* Mobile Filter Dropdown */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                סנן לפי קטגוריה
                <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute left-4 right-4 mt-2 p-4 bg-white rounded-lg shadow-lg z-50">
                  <FilterContent />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">קטגוריות</h2>
              <FilterContent />
            </div>
          </div>
          
          {/* Apps Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedApps.map((app) => (
                <Link
                  key={app.id}
                  to={`/apps/${app.id}`}
                  className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={app.icon} alt={app.name} className="h-12 w-12 rounded-xl shadow-md" />
                      <div className="mr-3 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                          {app.editorsPick && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Award className="h-3 w-3" />
                              בחירת העורך
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {app.categories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {categoryLabels[category]}
                        </span>
                      ))}
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
      </div>
    </div>
  );
}