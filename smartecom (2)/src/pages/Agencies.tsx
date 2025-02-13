import React from 'react';
import { Link } from 'react-router-dom';
import { agencies } from '../data/mockData';
import { Star } from 'lucide-react';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';

export default function Agencies() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4">סוכנויות מובילות</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {agencies.map((agency) => (
            <Link
              key={agency.id}
              to={`/agencies/${agency.id}`}
              className="bg-white overflow-hidden shadow-lg rounded-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={agency.logo} alt={agency.name} className="h-16 w-16 rounded-md" />
                  <div className="mr-3 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{agency.name}</h3>
                    {agency.badge && (
                      <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-md ${
                        agency.badge === 'Shopify Plus' 
                          ? 'bg-purple-100 text-purple-800'
                          : agency.badge === "Editor's Choice"
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {agency.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{agency.description}</p>

                {agency.reviews && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(agency.reviews.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {agency.reviews.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({agency.reviews.count} ביקורות)
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}