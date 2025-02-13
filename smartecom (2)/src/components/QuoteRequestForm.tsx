import React, { useState } from 'react';
import { X } from 'lucide-react';

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  agencyName: string;
  agencyId: string;
}

export default function QuoteRequestForm({ isOpen, onClose, agencyName, agencyId }: QuoteRequestFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    email: '',
    phone: '',
    projectDetails: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'quote-request',
          ...formData,
          agencyId,
          agencyName
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all max-w-lg w-full">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              בקש הצעת מחיר מ-{agencyName}
            </h2>
            <p className="mt-2 text-gray-600">
              מלא את הפרטים ונחזור אליך בהקדם עם הצעה מותאמת אישית
            </p>
          </div>

          {success ? (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-green-800">
                הטופס נשלח בהצלחה! ניצור איתך קשר בהקדם.
              </p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
              data-netlify="true"
              name="quote-request"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="quote-request" />
              <input type="hidden" name="agencyId" value={agencyId} />
              <input type="hidden" name="agencyName" value={agencyName} />
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
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  כתובת האתר
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    דוא"ל
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700">
                  פרטי הפרויקט
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  placeholder="תאר את הפרויקט שלך והצרכים שלך..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    תקציב משוער
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  >
                    <option value="">בחר תקציב</option>
                    <option value="0-5000">עד 5,000 ₪</option>
                    <option value="5000-10000">5,000 - 10,000 ₪</option>
                    <option value="10000-20000">10,000 - 20,000 ₪</option>
                    <option value="20000+">מעל 20,000 ₪</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    לוח זמנים
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                  >
                    <option value="">בחר לוח זמנים</option>
                    <option value="immediate">מיידי</option>
                    <option value="1-month">תוך חודש</option>
                    <option value="3-months">תוך 3 חודשים</option>
                    <option value="flexible">גמיש</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full button-primary"
              >
                {isSubmitting ? 'שולח...' : 'שלח בקשה להצעת מחיר'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}