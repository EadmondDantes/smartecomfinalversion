import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white">צור קשר</Link></li>
              <li><Link to="/submit-brand" className="text-gray-300 hover:text-white">שלח את המותג שלך</Link></li>
              <li><Link to="/register-agency" className="text-gray-300 hover:text-white">הירשם כסוכנות</Link></li>
              <li><Link to="/submit-tool" className="text-gray-300 hover:text-white">שלח כלי טכנולוגי</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">אודותינו</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">מדיניות פרטיות</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">תנאי שימוש</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">תוכן</h3>
            <ul className="space-y-2">
              <li><Link to="/guides" className="text-gray-300 hover:text-white">הנחיות כלי עבודה</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">הנחיות בעסקים</Link></li>
              <li><Link to="/shopify-apps" className="text-gray-300 hover:text-white">המלצות בחנויות Shopify</Link></li>
              <li><Link to="/shopify-themes" className="text-gray-300 hover:text-white">העיצובים בחנויות Shopify</Link></li>
              <li><Link to="/business-tips" className="text-gray-300 hover:text-white">טיפורי מכירות ומסחר</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">כלי עבודה</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/all" className="text-gray-300 hover:text-white">כל הכלים</Link></li>
              <li><Link to="/tools/premium" className="text-gray-300 hover:text-white">כלי פרמיום</Link></li>
              <li><Link to="/tools/optimization" className="text-gray-300 hover:text-white">כלי אופטימיזציה</Link></li>
              <li><Link to="/tools/marketing" className="text-gray-300 hover:text-white">כלי שיווק</Link></li>
              <li><Link to="/tools/reviews" className="text-gray-300 hover:text-white">כלים שיווקיים</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">מותגים</h3>
            <ul className="space-y-2">
              <li><Link to="/brands/all" className="text-gray-300 hover:text-white">כל המותגים</Link></li>
              <li><Link to="/brands/kids" className="text-gray-300 hover:text-white">מותגי ילדים</Link></li>
              <li><Link to="/brands/fashion" className="text-gray-300 hover:text-white">מותגי מזון</Link></li>
              <li><Link to="/brands/home" className="text-gray-300 hover:text-white">מותגי בית</Link></li>
              <li><Link to="/brands/sports" className="text-gray-300 hover:text-white">מותגי יופי</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-right">© 2024 SmartEcom. כל הזכויות שמורות.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}