import React, { useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export default function ServiceProviders() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: '',
    serviceType: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    description: ''
  });

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, website: value });
    
    if (value && !value.startsWith('https://')) {
      setWebsiteError('כתובת האתר חייבת להתחיל ב-https://');
    } else {
      setWebsiteError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.website && !formData.website.startsWith('https://')) {
      setWebsiteError('כתובת האתר חייבת להתחיל ב-https://');
      return;
    }
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'service-provider',
          ...formData
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-32 flex items-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            תודה על הרשמתך!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            קיבלנו את פרטי ההרשמה שלך. נבחן את הבקשה ונחזור אליך בהקדם אם נצטרך פרטים נוספים.
          </p>
          <a href="/" className="button-primary inline-block">
            חזור לדף הבית
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            בקרוב
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            הרשמה כנותן שירות
          </h1>
          <p className="text-lg text-gray-600">
            הצטרף למאגר נותני השירות המובילים שלנו והגדל את החשיפה של העסק שלך
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form 
            onSubmit={handleSubmit}
            className="space-y-6"
            method="POST"
            data-netlify="true"
            name="service-provider"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="service-provider" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                שם העסק
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                סוג השירות
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              >
                <option value="">בחר סוג שירות</option>
                <option value="seo">קידום אורגני</option>
                <option value="ppc">קידום ממומן</option>
                <option value="social">ניהול סושיאל</option>
                <option value="ugc">UGC</option>
                <option value="photography">צילום מוצרים</option>
                <option value="content">כתיבת תוכן</option>
                <option value="logistics">לוגיסטיקה ומשלוחים</option>
                <option value="customer-service">שירות לקוחות</option>
                <option value="legal">ייעוץ משפטי</option>
                <option value="accounting">הנהלת חשבונות</option>
                <option value="other">אחר</option>
              </select>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  אתר אינטרנט
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <HelpCircle className="h-4 w-4" />
                  </button>
                  {showTooltip && (
                    <div className="absolute z-10 -right-2 top-6 w-48 p-2 bg-gray-900 text-white text-sm rounded-lg">
                      יש להזין כתובת מלאה כולל https://
                    </div>
                  )}
                </div>
              </div>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="https://"
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-rose-500 ${
                  websiteError 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-300 focus:border-rose-500'
                }`}
                value={formData.website}
                onChange={handleWebsiteChange}
              />
              {websiteError && (
                <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{websiteError}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                תיאור השירות
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  איש קשר
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  טלפון
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                דוא"ל
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full button-primary"
            >
              שלח בקשת הרשמה
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}