import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
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
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">צור קשר</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">השאירו פרטים</h2>
              <form 
                className="space-y-6" 
                onSubmit={handleSubmit}
                data-netlify="true"
                name="contact"
                netlify-honeypot="bot-field"
                method="POST"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <p className="text-green-800">
                      ההודעה נשלחה בהצלחה! ניצור איתך קשר בהקדם.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">פרטי התקשרות</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-gray-400" />
                  <span className="mr-3 text-gray-500">contact@smartecom.co.il</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-gray-400" />
                  <span className="mr-3 text-gray-500">03-1234567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-gray-400" />
                  <span className="mr-3 text-gray-500">רוטשילד 1, תל אביב</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">שעות פעילות</h3>
                <div className="text-gray-500">
                  <p>ראשון - חמישי: 09:00 - 18:00</p>
                  <p>שישי: 09:00 - 13:00</p>
                  <p>שבת: סגור</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}