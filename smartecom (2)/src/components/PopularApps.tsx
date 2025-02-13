import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredApps } from '../data/mockData';
import { ExternalLink, ChevronRight, ChevronLeft, Award } from 'lucide-react';
import { categoryLabels } from '../types';
import DiscountPopup from './DiscountPopup';

export default function PopularApps() {
  const [selectedApp, setSelectedApp] = useState<{ id: string; name: string } | null>(null);
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
  
  // Show first 6 apps on home page
  const displayedApps = featuredApps.slice(0, 6);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          <span className="gradient-text">כלים ואפליקציות פופולריים</span>
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

          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            <div className="inline-flex gap-6 px-4">
              {displayedApps.map((app) => (
                <Link
                  key={app.id}
                  to={`/apps/${app.id}`}
                  className="glass-card hover-card rounded-md w-[300px] sm:w-[350px] flex-shrink-0 snap-center"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img src={app.icon} alt={app.name} className="h-12 w-12 rounded-md shadow-md" />
                      <div className="mr-3 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">{app.name}</h3>
                          {app.editorsPick && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
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
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {categoryLabels[category]}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedApp && (
        <DiscountPopup
          isOpen={true}
          onClose={() => setSelectedApp(null)}
          appName={selectedApp.name}
          appId={selectedApp.id}
        />
      )}
    </div>
  );
}