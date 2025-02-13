import React, { useState } from 'react';
import { Star, Upload } from 'lucide-react';
import { agencies } from '../data/mockData';
import { supabase } from '../lib/supabase';

export default function SubmitReview() {
  const [selectedAgency, setSelectedAgency] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!file) {
        throw new Error('נדרש להעלות קובץ אימות');
      }

      // Upload verification file
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error('שגיאה בהעלאת הקובץ');
      }

      // Submit review
      const { error: insertError } = await supabase
        .from('agency_reviews')
        .insert([
          {
            agency_id: selectedAgency,
            rating,
            review,
            email,
            verification_file: fileName,
            status: 'pending'
          }
        ]);

      if (insertError) {
        throw new Error('שגיאה בשליחת הביקורת');
      }

      setSuccess(true);
      // Reset form
      setSelectedAgency('');
      setRating(0);
      setReview('');
      setEmail('');
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בשליחת הטופס');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen py-32 flex items-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            תודה על הביקורת שלך!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            נבדוק את חוות דעתך, במידה והיא עומדת בקריטריונים שלנו היא תפורסם בהקדם.
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
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            השאר חוות דעת על סוכנות הדיגיטל שלך
          </h1>
          <p className="text-lg text-gray-600">
            חוות דעת שלך תעזור לאחרים לקבל החלטה מושכלת
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="agency" className="block text-sm font-medium text-gray-700">
                בחר סוכנות
              </label>
              <select
                id="agency"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="">בחר סוכנות</option>
                {agencies.map((agency) => (
                  <option key={agency.id} value={agency.id}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                דירוג
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                חוות דעת
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                דוא"ל
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אנו דוגלים בחוות דעת מאומתות בלבד - אנא העלה צילום ת.ז/רשיון נהיגה או תמונה מהבאקאנד של האתר
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-rose-500"
                    >
                      <span>העלה קובץ</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        accept="image/*,.pdf"
                      />
                    </label>
                    <p className="pr-1">או גרור לכאן</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, PDF עד 10MB
                  </p>
                </div>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  נבחר: {file.name}
                </p>
              )}
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
              {isSubmitting ? 'שולח...' : 'שלח חוות דעת'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}