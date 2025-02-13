import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LeadForm } from '../types';

interface DiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  appId: string;
}

export default function DiscountPopup({ isOpen, onClose, appName, appId }: DiscountPopupProps) {
  const [formData, setFormData] = useState<LeadForm>({
    firstName: '',
    websiteUrl: '',
    email: '',
    appId: appId
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'discount-request',
          ...formData,
          appName
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          firstName: '',
          websiteUrl: '',
          email: '',
          appId: appId
        });
      }, 2000);
    } catch (err) {
      setError('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute left-0 top-0 pl-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-right w-full">
              <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-4">
                קבל הנחה ל-{appName}
              </h3>

              {success ? (
                <div className="rounded-md bg-green-50 p-4">
                  <p className="text-green-800">
                    הטופס נשלח בהצלחה! ניצור איתך קשר בהקדם.
                  </p>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-4"
                  data-netlify="true"
                  name="discount-request"
                  netlify-honeypot="bot-field"
                  method="POST"
                >
                  <input type="hidden" name="form-name" value="discount-request" />
                  <input type="hidden" name="appId" value={appId} />
                  <input type="hidden" name="appName" value={appName} />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      שם פרטי
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
                      כתובת האתר
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    />
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

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary w-full"
                  >
                    {isSubmitting ? 'שולח...' : 'קבל הנחה'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}