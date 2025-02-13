import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredBrands } from '../data/mockData';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

export default function PopularBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth;
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Show first 6 brands on home page
  const displayedBrands = featuredBrands.slice(0, 6);

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          <span className="gradient-text">מותגים ישראלים פופולריים</span>
        </h2>
        
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="inline-flex gap-6 px-4">
              {displayedBrands.map((brand, index) => (
                <div 
                  key={brand.id}
                  className="glass-card hover-card rounded-md w-[300px] sm:w-[350px] flex-shrink-0 snap-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={brand.logo} alt={brand.name} className="h-16 w-16 rounded-md shadow-md" />
                      <h3 className="mr-4 text-xl font-bold text-gray-900">{brand.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">אפליקציות בשימוש:</h4>
                      <ul className="space-y-1 mb-4">
                        {brand.apps.map((app) => (
                          <li key={app.id} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
                            {app.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Link 
                        to={`/brands/${brand.id}`}
                        className="button-primary flex-1 text-center"
                      >
                        צפה בפרופיל המותג
                      </Link>
                      <a 
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label={`Visit ${brand.name} website`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}