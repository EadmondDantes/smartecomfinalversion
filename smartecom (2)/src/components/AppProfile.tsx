import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { featuredApps } from '../data/mockData';
import { categoryLabels } from '../types';
import DiscountPopup from '../components/DiscountPopup';
import { Award, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';

export default function AppProfile() {
  const { id } = useParams();
  const app = featuredApps.find(a => a.id === id);
  const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const breadcrumbs = useBreadcrumbs();

  if (!app) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">אפליקציה לא נמצאה</h1>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    if (app.carousel) {
      setCurrentImage((prev) => (prev === 0 ? app.carousel!.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (app.carousel) {
      setCurrentImage((prev) => (prev === app.carousel!.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        
        <div className="bg-white shadow rounded-md overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-8">
              <img src={app.icon} alt={app.name} className="h-24 w-24 rounded-md shadow-md" />
              <div className="mr-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                  {app.editorsPick && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                      <Award className="h-4 w-4" />
                      בחירת העורך
                    </span>
                  )}
                </div>
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
            </div>

            <p className="text-gray-500 text-lg mb-6">{app.description}</p>

            {app.carousel ? (
              <div className="relative mb-8">
                <div className="aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <img 
                    src={app.carousel[currentImage]} 
                    alt={`${app.name} screenshot ${currentImage + 1}`} 
                    className="w-full h-full object-cover sm:object-contain scale-[1.15] sm:scale-100"
                  />
                </div>
                <button
                  onClick={handlePrevImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/75 text-white hover:bg-black/90 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/75 text-white hover:bg-black/90 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {app.carousel.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImage ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : app.image && (
              <div className="mb-8">
                <img src={app.image} alt={`${app.name} screenshot`} className="w-full rounded-lg shadow-lg" />
              </div>
            )}

            {app.features && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">יכולות האפליקציה</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {app.discountAvailable && (
                <button
                  onClick={() => setIsDiscountPopupOpen(true)}
                  className="w-full sm:w-auto px-8 py-5 text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-600 text-white rounded-xl shadow-xl hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105"
                >
                  קבל הנחה לאפליקציה
                </button>
              )}
              
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-5 text-lg font-bold text-center bg-white text-gray-900 rounded-xl shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-200"
                >
                  צפה באפליקציה
                </a>
              )}
            </div>

            {app.blogPost && (
              <div className="mt-8 border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{app.blogPost.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{app.blogPost.author}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={app.blogPost.date}>
                    {new Date(app.blogPost.date).toLocaleDateString('he-IL')}
                  </time>
                </div>
                <div className="prose prose-lg max-w-none">
                  {app.blogPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isDiscountPopupOpen && (
        <DiscountPopup
          isOpen={true}
          onClose={() => setIsDiscountPopupOpen(false)}
          appName={app.name}
          appId={app.id}
        />
      )}
    </div>
  );
}