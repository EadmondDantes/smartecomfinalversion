import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center lg:text-right">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="block gradient-text animate-gradient">
              למד מהמותגים המובילים
            </span>
            <span className="block text-black">
              בשופיפיי ישראל!
            </span>
          </h1>
          <div className="max-w-3xl lg:mx-0">
            <p className="text-lg text-gray-600 sm:text-xl mb-3">
              גלה את הכלים, הטכנולוגיות והאסטרטגיות שמאחורי המותגים המובילים בישראל.
            </p>
            <p className="text-lg text-gray-600 sm:text-xl mb-3">
              אנחנו חושפים את הסודות להצלחה – מהמוצרים והשיווק ועד לאוטומציות וחוויית הלקוח.
            </p>
            <p className="text-lg text-gray-600 sm:text-xl mb-6">
              קבל תובנות ופתרונות מעשיים שתוכל להתאים לעסק שלך ולמקסם את ההצלחה.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
            <Link 
              to="/brands" 
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              חקור מותגים
            </Link>
            <Link 
              to="/apps" 
              className="w-full sm:w-auto px-8 py-4 text-lg font-medium inline-flex items-center justify-center bg-white text-black rounded-xl shadow-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              חקור אפליקציות
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}