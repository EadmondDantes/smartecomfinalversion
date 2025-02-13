import React, { useState } from 'react';

export default function About() {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'grow-business',
          ...formData
        }).toString()
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSuccess(true);
      setFormData({
        businessName: '',
        website: '',
        email: '',
        phone: '',
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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">אודות SmartEcom</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-8">
                SmartEcom היא הפלטפורמה המובילה בישראל לגילוי, השוואה והטמעה של פתרונות טכנולוגיים לניהול עסקים אונליין. אנחנו מספקים מידע מקיף, ניתוח מעמיק וליווי אישי לבעלי עסקים המחפשים את הכלים האופטימליים להאצת הצמיחה העסקית שלהם בעידן הדיגיטלי.
              </p>

              <div className="my-12 relative w-full">
                <div className="aspect-video w-full overflow-hidden rounded-xl shadow-xl">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://res.cloudinary.com/dkdyc0gyz/video/upload/v1738677789/wlzeedmsmz622vizghqf.jpg"
                  >
                    <source
                      src="https://res.cloudinary.com/dkdyc0gyz/video/upload/v1738677789/wlzeedmsmz622vizghqf.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">המשימה שלנו</h2>
              <p className="text-gray-600 mb-8">
                להנגיש את הטכנולוגיה המתקדמת ביותר לעסקים ישראליים ולהעצים אותם באמצעות כלים דיגיטליים חדשניים. אנחנו מאמינים שכל עסק, קטן כגדול, ראוי לגישה לפתרונות הטכנולוגיים המובילים בשוק ולידע המקצועי הדרוש כדי להטמיע אותם בהצלחה.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">איך אנחנו עוזרים</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">סקירות מעמיקות של אפליקציות וכלים</h3>
                  <p className="text-gray-600">אנחנו בוחנים כל פתרון לעומק, בודקים את כל התכונות והיכולות, ומספקים תובנות מבוססות ניסיון אמיתי בשטח.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">השוואות מקיפות בין פתרונות שונים</h3>
                  <p className="text-gray-600">אנחנו מנתחים את ההבדלים בין המוצרים המובילים בכל קטגוריה, כולל השוואת מחירים, תכונות, ממשק משתמש, ותמיכה טכנית.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">מדריכים מקצועיים להטמעת כלים</h3>
                  <p className="text-gray-600">צוות המומחים שלנו מכין מדריכים מפורטים צעד אחר צעד, המותאמים במיוחד לשוק הישראלי ולצרכים הייחודיים של עסקים מקומיים.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ליווי בבחירת הכלים המתאימים ביותר</h3>
                  <p className="text-gray-600">אנחנו מקשיבים לצרכים הספציפיים של כל עסק ומייעצים באופן אישי על הפתרונות המתאימים ביותר, תוך התחשבות בתקציב, בגודל העסק ובמטרות העסקיות.</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">הערכים שלנו</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">מקצועיות</h3>
                    <p className="text-gray-600">אנחנו מחויבים למצוינות ולדיוק בכל המלצה שאנחנו נותנים</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">אובייקטיביות</h3>
                    <p className="text-gray-600">הסקירות וההמלצות שלנו מבוססות אך ורק על איכות המוצר והתאמתו לצרכי הלקוח</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">שקיפות</h3>
                    <p className="text-gray-600">אנחנו מציגים את כל המידע באופן ברור וגלוי, כולל יתרונות וחסרונות</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500 mt-2.5"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">חדשנות</h3>
                    <p className="text-gray-600">אנחנו תמיד בחזית הטכנולוגיה, מתעדכנים בחידושים האחרונים ומביאים אותם ללקוחותינו</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">צוות המומחים שלנו</h2>
              <p className="text-gray-600 mb-16">
                הצוות שלנו מורכב ממומחי טכנולוגיה ויועצים עסקיים מנוסים, כל אחד עם התמחות ייחודית בתחומי המסחר האלקטרוני, השיווק הדיגיטלי והטרנספורמציה העסקית. המומחים שלנו משלבים ידע טכנולוגי מעמיק עם הבנה עסקית מקיפה, מה שמאפשר לנו להציע פתרונות מותאמים אישית שבאמת עובדים. אנחנו מחויבים להצלחת הלקוחות שלנו ומלווים אותם בכל שלב בדרך להצלחה בעולם הדיגיטלי.
              </p>

              <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-8 border border-rose-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">אני רוצה להגדיל את העסק שלי</h2>
                <p className="text-lg text-gray-600 mb-8">
                  מלא את הפרטים ונחזור אליך עם תוכנית פעולה מותאמת אישית להגדלת המכירות שלך
                </p>

                <form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-netlify="true"
                  name="grow-business"
                  netlify-honeypot="bot-field"
                >
                  <input type="hidden" name="form-name" value="grow-business" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      ספר לנו על העסק שלך והאתגרים שאיתם אתה מתמודד
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    />
                  </div>

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="rounded-md bg-green-50 p-4">
                      <p className="text-sm text-green-700">
                        הטופס נשלח בהצלחה! ניצור איתך קשר בהקדם.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'שולח...' : 'בואו נדבר על הגדלת המכירות שלך'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}