import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { agencies } from '../data/mockData';
import { Star } from 'lucide-react';
import LeaveReviewButton from '../components/LeaveReviewButton';
import QuoteRequestForm from '../components/QuoteRequestForm';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';

export default function AgencyProfile() {
  const { id } = useParams();
  const agency = agencies.find(a => a.id === id);
  const breadcrumbs = useBreadcrumbs();
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  if (!agency) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">סוכנות לא נמצאה</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <img src={agency.logo} alt={agency.name} className="h-24 w-24 rounded-xl shadow-lg" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{agency.name}</h1>
                  {agency.badge && (
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
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
                <p className="text-lg text-gray-600 mb-4">{agency.description}</p>
                {agency.reviews && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(agency.reviews.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-900">
                      {agency.reviews.rating}
                    </span>
                    <span className="text-gray-500">
                      ({agency.reviews.count} ביקורות)
                    </span>
                  </div>
                )}
              </div>
              <div className="w-full sm:w-auto">
                <LeaveReviewButton 
                  agencyId={agency.id} 
                  agencyName={agency.name}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">שירותים</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span className="text-gray-600">הקמת חנויות Shopify</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span className="text-gray-600">עיצוב ופיתוח אתרים</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span className="text-gray-600">קידום אורגני וממומן</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span className="text-gray-600">ניהול מדיה חברתית</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">בקש הצעת מחיר</h2>
                <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl p-6 border border-rose-100">
                  <p className="text-gray-600 mb-4">
                    מעוניין לשמוע עוד על השירותים שלנו? השאר פרטים ונחזור אליך בהקדם עם הצעה מותאמת אישית.
                  </p>
                  <button
                    onClick={() => setIsQuoteFormOpen(true)}
                    className="w-full button-primary"
                  >
                    בקש הצעת מחיר
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuoteRequestForm
        isOpen={isQuoteFormOpen}
        onClose={() => setIsQuoteFormOpen(false)}
        agencyName={agency.name}
        agencyId={agency.id}
      />
    </div>
  );
}