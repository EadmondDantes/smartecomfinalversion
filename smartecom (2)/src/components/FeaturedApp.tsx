import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { featuredApps } from '../data/mockData';

export default function FeaturedApp() {
  // Find Assortion app
  const assortionApp = featuredApps.find(app => app.name === 'Assortion: Upsell & Bundles');

  if (!assortionApp) return null;

  return (
    <div className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <Award className="h-12 w-12 text-indigo-600 mx-auto animate-float" />
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            כלי החודש
          </h2>
        </div>

        <div className="glass-card hover-card rounded-2xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img 
                  className="h-20 w-20 rounded-2xl shadow-lg" 
                  src={assortionApp.icon}
                  alt={assortionApp.name} 
                />
              </div>
              <div className="mr-6">
                <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-2">
                  {assortionApp.name}
                </h3>
                <p className="text-gray-600 text-lg">
                  {assortionApp.description}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a 
                href={assortionApp.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="button-primary inline-flex items-center gap-2"
              >
                למד עוד
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}