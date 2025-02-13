import React from 'react';

export default function VideoFeature() {
  return (
    <div className="relative w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-16">
        <div className="text-center mb-4 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-4">
            הטכנולוגיה שמאחורי Shopify – ההבדל בין חנות ממוצעת לחנות שמוכרת!
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            בלי טכנולוגיה חכמה, אתה מפספס כסף – כך תבנה סטאק מנצח ב-Shopify!
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="relative max-w-[2000px] mx-auto">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://res.cloudinary.com/dkdyc0gyz/video/upload/v1738677789/iwjcrzv0himbrbozhosc.jpg"
          >
            <source
              src="https://res.cloudinary.com/dkdyc0gyz/video/upload/v1738677789/iwjcrzv0himbrbozhosc.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}