import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LeadMagnetFormProps {
  title: string;
  description: string;
  fileUrl: string;
  onClose: () => void;
}

export default function LeadMagnetForm({ title, description, fileUrl, onClose }: LeadMagnetFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically send the email to your backend/newsletter service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      // Automatically download the file
      window.open(fileUrl, '_blank');
      
      // Close the form after a delay
      setTimeout(() => {
        onClose();
      }, 3000);
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
                {title}
              </h3>
              <p className="text-gray-600 mb-6">{description}</p>

              {success ? (
                <div className="rounded-md bg-green-50 p-4">
                  <p className="text-green-800">
                    תודה! הקובץ יורד אוטומטית. אם ההורדה לא החלה,{' '}
                    <a 
                      href={fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      לחץ כאן
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      דוא"ל
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    {isSubmitting ? 'שולח...' : 'הורד עכשיו'}
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