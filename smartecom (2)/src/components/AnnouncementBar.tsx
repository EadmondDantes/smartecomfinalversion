import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">
              האתר בהרצה, נשמח לחוות דעת{' '}
              <Link to="/contact" className="underline hover:no-underline">
                דרך טופס צור קשר
              </Link>
            </span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-white/80 transition-colors"
            aria-label="סגור הודעה"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}