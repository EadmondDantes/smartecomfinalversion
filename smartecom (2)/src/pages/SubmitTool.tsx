import React from 'react';
import { Wrench } from 'lucide-react';

export default function SubmitTool() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">שלח כלי טכנולוגי</h1>
          <p className="text-lg text-gray-600">
            הוסף את הכלי הטכנולוגי שלך למאגר הכלים המובילים שלנו
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form 
            name="submit-tool"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="submit-tool" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">
                שם הכלי
              </label>
              <input
                type="text"
                id="toolName"
                name="toolName"
                required
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
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                תיאור הכלי
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="תאר את היכולות והיתרונות של הכלי..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                קטגוריה
              </label>
              <select
                id="category"
                name="category"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              >
                <option value="">בחר קטגוריה</option>
                <option value="optimization">אופטימיזציה</option>
                <option value="marketing">שיווק</option>
                <option value="reviews">חוות דעת</option>
                <option value="support">שירות לקוחות</option>
                <option value="loyalty">מועדוני לקוחות</option>
                <option value="design">עיצוב</option>
              </select>
            </div>

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
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Wrench className="h-5 w-5" />
              שלח כלי
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}