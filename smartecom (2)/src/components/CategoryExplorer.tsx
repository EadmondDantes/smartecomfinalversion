import React, { useState } from 'react';
import { Category, categoryLabels } from '../types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            חקור כלים לפי קטגוריה
          </h2>
          <p className="text-lg text-gray-600">
            גלה את הכלים המתאימים ביותר לצרכים הספציפיים של העסק שלך
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(Object.entries(categoryLabels) as [Category, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                selectedCategory === key
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 shadow hover:shadow-lg'
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{label}</h3>
              <p className="text-sm opacity-80">
                {getDescriptionForCategory(key)}
              </p>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="mt-12 text-center">
            <Link 
              to={`/apps?category=${selectedCategory}`}
              className="button-primary inline-flex items-center gap-2"
            >
              צפה בכלים ב{categoryLabels[selectedCategory]}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function getDescriptionForCategory(category: Category): string {
  const descriptions: Record<Category, string> = {
    optimization: 'כלים לשיפור חווית המשתמש וההמרות',
    marketing: 'פתרונות לקידום ושיווק העסק',
    reviews: 'מערכות לניהול חוות דעת וביקורות',
    support: 'כלים לשירות ותמיכת לקוחות',
    loyalty: 'תוכניות מועדון ושימור לקוחות',
    design: 'כלים לעיצוב ועריכת תוכן',
    operations: 'פתרונות לניהול ותפעול העסק',
    seo: 'כלים לקידום אורגני ואופטימיזציה',
    email: 'פלטפורמות לשיווק באימייל וסמס',
    analytics: 'כלים לניתוח נתונים ומדידה',
    popups: 'פתרונות לחלונות קופצים והמרות',
    ugc: 'כלים ליצירת תוכן משתמשים',
    dropshipping: 'פתרונות לניהול דרופשיפינג'
  };
  return descriptions[category];
}