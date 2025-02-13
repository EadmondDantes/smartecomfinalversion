import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { featuredApps } from '../data/mockData';
import { categoryLabels } from '../types';
import DiscountPopup from '../components/DiscountPopup';
import { Award, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AppProfile() {
  const { id } = useParams();
  const app = featuredApps.find(a => a.id === id);
  const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-8">
              <img src={app.icon} alt={app.name} className="h-24 w-24 rounded-lg" />
              <div className="mr-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                  {app.editorsPick && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      <Award className="h-4 w-4" />
                      בחירת העורך
                    </span>
                  )}
                </div>
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
            </div>

            <p className="text-gray-500 text-lg mb-6">{app.description}</p>

            {app.carousel ? (
              <div className="relative mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={app.carousel[currentImage]} 
                    alt={`${app.name} screenshot ${currentImage + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handlePrevImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {app.carousel.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">תכונות עיקריות</h2>
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

            <div className="flex flex-wrap gap-4">
              {app.discountAvailable && (
                <button
                  onClick={() => setIsDiscountPopupOpen(true)}
                  className="button-primary"
                >
                  קבל הנחה לאפליקציה
                </button>
              )}
              
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
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