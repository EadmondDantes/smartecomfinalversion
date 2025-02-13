import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredBrands } from '../data/mockData';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';
import { ExternalLink } from 'lucide-react';

export default function BrandProfile() {
  const { id } = useParams();
  const brand = featuredBrands.find(b => b.id === id);
  const breadcrumbs = useBreadcrumbs();

  if (!brand) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">מותג לא נמצא</h1>
        </div>
      </div>
    );
  }

  const isGottex = brand.id === 'gottex';

  return (
    <div>
      {/* Banner Image for Gottex */}
      {isGottex && (
        <div className="w-full h-[400px] relative overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dkdyc0gyz/image/upload/v1738979563/logos/fususrvs4yeftuwlrxyi.jpg"
            alt="Gottex Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-5xl font-bold mb-4">Gottex</h1>
              <p className="text-xl">מותג בגדי הים היוקרתי המוביל בישראל</p>
            </div>
          </div>
        </div>
      )}

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <img src={brand.logo} alt={brand.name} className="h-24 w-24 rounded-xl shadow-lg" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
                  <p className="text-xl text-gray-600">{brand.description}</p>
                </div>
              </div>

              {isGottex && (
                <div className="mb-12">
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Gottex הוא מותג בגדי ים יוקרתי שנוסד בישראל בשנת 1956 על ידי ליאה גוטליב. המותג ידוע בעיצוביו האיכותיים, בדגש על פרטים ייחודיים וחומרים משובחים. כיום, Gottex הוא אחד ממותגי בגדי הים המובילים בעולם, עם נוכחות בחנויות היוקרה המובילות ברחבי העולם.
                  </p>
                  <img 
                    src="https://res.cloudinary.com/dkdyc0gyz/image/upload/v1738979564/logos/mw8dhiskrtovoo7pecz0.png"
                    alt="Gottex Collection"
                    className="w-full rounded-xl shadow-lg mb-8"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">כלים טכנולוגיים בשימוש</h2>
                  <div className="space-y-4">
                    {brand.apps.map((app) => (
                      <Link
                        key={app.id}
                        to={`/apps/${app.id}`}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <img src={app.icon} alt={app.name} className="h-12 w-12 rounded-lg shadow" />
                        <div>
                          <h3 className="font-medium text-gray-900">{app.name}</h3>
                          <p className="text-sm text-gray-600">{app.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">פרטי התקשרות</h2>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      בקר באתר המותג
                    </a>
                  </div>
                </div>
              </div>

              {isGottex && (
                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">הישגים ונקודות ציון</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <div className="text-3xl font-bold text-rose-600 mb-2">Shopify Plus</div>
                      <div className="text-gray-600">פלטפורמה</div>
                    </div>
                    <Link
                      to="/agencies/boa"
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-3xl font-bold text-rose-600 mb-2">BOA Ideas</div>
                      <div className="text-gray-600">סוכנות מבצעת</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}