import React from 'react';
import { ExternalLink, Star } from 'lucide-react';

interface ToolRecommendationProps {
  name: string;
  icon: string;
  description: string;
  features: string[];
  website?: string;
}

export default function ToolRecommendation({ name, icon, description, features, website }: ToolRecommendationProps) {
  return (
    <div className="my-12 bg-gradient-to-br from-indigo-50 via-white to-rose-50 rounded-2xl border border-indigo-100 overflow-hidden shadow-xl">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <img src={icon} alt={name} className="w-16 h-16 rounded-xl shadow-lg" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 fill-current" />
                מומלץ
              </span>
            </div>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
              <Star className="h-5 w-5 text-yellow-500 fill-current flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-flex items-center gap-2"
          >
            נסה את {name} בחינם
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}