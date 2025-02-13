import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, X } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  logo: string;
  description: string;
  quote: string;
  author: string;
  role: string;
  metrics: {
    label: string;
    value: string;
  }[];
  fullStory?: {
    content: string;
    tools: {
      name: string;
      icon: string;
      description: string;
    }[];
  };
}

const successStories: SuccessStory[] = [
  {
    id: 'strongful',
    name: 'Strongful',
    logo: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=128&h=128&fit=crop&auto=format',
    description: 'מותג בגדי הספורט המוביל לנשים בישראל',
    quote: 'הכלים שמצאנו דרך SmartEcom שיפרו משמעותית את הביצועים של החנות שלנו',
    author: 'דור קדם וירדן דויטש',
    role: 'מייסדי Strongful',
    metrics: [
      { label: 'גידול במכירות', value: '156%' },
      { label: 'שיפור בהמרות', value: '2.4x' }
    ],
    fullStory: {
      content: `סטרונגפול, מותג בגדי הספורט המוביל לנשים בישראל, חוגג ארבע שנים של הצלחה מסחררת והתפתחות מרשימה. מאז הקמתו בשנת 2021, הפך המותג לשם דבר בתחום ההעצמה הנשית, החדשנות ושילוב מושלם בין פונקציונליות וסטייל.

התפתחות המותג
בתחילת דרכו, השיק סטרונגפול את קולקציית בלאנס האייקונית, שזכתה להצלחה מסחררת בקרב הלקוחות. הקולקציה כללה ארבע גזרות טייץ קלאסיות, והיוותה את אבן הפינה להצלחת המותג.

חדשנות מתמדת
לאורך השנים, המשיך סטרונגפול להתחדש ולהתפתח. הקולקציה המצליחה "Oasis" הושקה בגרסתה השנייה, עם דגמים חדשים כמו אוברול קצר עם תפר ייחודי.

ערכי המותג
- שילוב בין פונקציונליות וסטייל
- איכות ונוחות מקסימלית
- התאמה לטרנדים עדכניים
- מחויבות להעצמה נשית

מועדון לקוחות ונאמנות
כחלק מהצלחתו, השיק סטרונגפול מועדון לקוחות חדש המציע:
- צבירת נקודות על כל רכישה
- הטבות יום הולדת
- מבצעים מיוחדים לחברי המועדון`,
      tools: [
        {
          name: 'Twik',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1738524868/logos/sivxwfqwze2rbodmkdcu.png',
          description: 'פרסונליזציה ואופטימיזציה חכמה'
        },
        {
          name: 'Omnisend',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1736999428/logos/wznbx6lhaiympdmzekfs.png',
          description: 'אוטומציית שיווק רב-ערוצית'
        },
        {
          name: 'Yotpo',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1737590359/logos/axrmvs6klxzl0w6rcwvc.png',
          description: 'ניהול חוות דעת ונאמנות לקוחות'
        },
        {
          name: 'Glassix',
          icon: 'https://images.unsplash.com/photo-1557568192-225f9f3d9061?w=64&h=64&fit=crop&auto=format',
          description: 'פלטפורמת תקשורת ושירות לקוחות'
        },
        {
          name: 'Opinew',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1737590279/logos/sdqzdbav5s22kfpqe5vr.svg',
          description: 'מערכת חוות דעת מתקדמת'
        },
        {
          name: 'Back In Stock',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1737586866/logos/ittydnoulnr2qyoukpkc.png',
          description: 'התראות על מוצרים שחזרו למלאי'
        }
      ]
    }
  },
  {
    id: 'seestarz',
    name: 'SeeStarz',
    logo: 'https://images.unsplash.com/photo-1589363475296-e32b27dfb89e?w=128&h=128&fit=crop&auto=format',
    description: 'מותג משקפי שמש יוקרתי',
    quote: 'מצאנו את הכלים המושלמים לניהול המותג שלנו בעזרת SmartEcom',
    author: 'רותם לוי',
    role: 'סמנכ"ל דיגיטל SeeStarz',
    metrics: [
      { label: 'עלייה בהכנסות', value: '85%' },
      { label: 'חיסכון בעלויות', value: '45%' }
    ]
  },
  {
    id: 'itay-brands',
    name: 'Itai Brands',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=128&h=128&fit=crop&auto=format',
    description: 'מותג אופנה ישראלי מוביל לגברים',
    quote: 'הפלטפורמה עזרה לנו למצוא את הכלים הטובים ביותר לצמיחה',
    author: 'איתי כהן',
    role: 'מייסד Itai Brands',
    metrics: [
      { label: 'גידול בטראפיק', value: '210%' },
      { label: 'שיפור ב-ROI', value: '3.2x' }
    ]
  },
  {
    id: 'adah',
    name: 'ADAH',
    logo: 'https://images.unsplash.com/photo-1589363475296-e32b27dfb89e?w=128&h=128&fit=crop&auto=format',
    description: 'מותג האיפור והטיפוח המוביל בישראל',
    quote: 'SmartEcom עזרו לנו להתמקד בכלים הנכונים לקהל היעד שלנו',
    author: 'עדה לזורגן',
    role: 'מייסדת ADAH',
    metrics: [
      { label: 'שווי חברה', value: '27M ₪' },
      { label: 'גידול בהכנסות', value: '125%' }
    ],
    fullStory: {
      content: `חברת האיפור והטיפוח ADAH, שנוסדה על ידי עדה לזורגן, מאפרת אופנה מקצועית, ורמי ליפשטט, מהווה סיפור הצלחה ישראלי מרשים. החברה, שהחלה את דרכה בשנת 2018, התפתחה למותג מוביל בתחום האיפור המקצועי בישראל.

התפתחות המותג
מאז הקמתה, ADAH התמקדה בפיתוח מוצרי איפור מקצועיים תחת המותג ADAH. המוצרים פותחו על בסיס הניסיון העשיר של עדה לזורגן כמאפרת בינלאומית, תוך הקפדה על איכות גבוהה וחדשנות מתמדת.

ערוצי מכירה
המותג משווק את מוצריו במגוון ערוצים:
- אתר סחר בבעלות החברה
- אתרי סחר מקוונים מובילים
- בתי ספר לאיפור
- פרפומריות נבחרות

הצלחה ורכישה
ההצלחה המשמעותית של ADAH הובילה לעסקת רכישה על ידי טרמינל איקס, המפעילה את אתר הסחר של קבוצת פוקס, בשווי ראשוני של 27 מיליון שקל. העסקה כוללת רכישת 51% מהחברה תמורת 8 מיליון שקל, עם אופציות להגדלת האחזקות בעתיד.

המשך צמיחה
תחת הנהגתו של גיא ליפשטט כמנכ"ל, ועם הליווי המקצועי של המייסדים כיועצים, ADAH ממשיכה לצמוח ולהתפתח, תוך שמירה על הערכים המובילים של המותג:
- איכות בלתי מתפשרת
- חדשנות מתמדת
- מקצועיות ומומחיות
- התאמה לשוק המקומי`,
      tools: [
        {
          name: 'Twik',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1738524868/logos/sivxwfqwze2rbodmkdcu.png',
          description: 'פרסונליזציה ואופטימיזציה חכמה'
        },
        {
          name: 'Omnisend',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1736999428/logos/wznbx6lhaiympdmzekfs.png',
          description: 'אוטומציית שיווק רב-ערוצית'
        },
        {
          name: 'Yotpo',
          icon: 'https://res.cloudinary.com/dkdyc0gyz/image/upload/v1737590359/logos/axrmvs6klxzl0w6rcwvc.png',
          description: 'ניהול חוות דעת ונאמנות לקוחות'
        },
        {
          name: 'Glassix',
          icon: 'https://images.unsplash.com/photo-1557568192-225f9f3d9061?w=64&h=64&fit=crop&auto=format',
          description: 'פלטפורמת תקשורת ושירות לקוחות'
        }
      ]
    }
  }
];

export default function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            סיפורי הצלחה
          </h2>
          <p className="text-lg text-gray-600">
            מותגים מובילים שמצאו את הכלים המושלמים דרכנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {successStories.map((story) => (
            <div 
              key={story.id}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={story.logo} 
                  alt={story.name}
                  className="w-16 h-16 rounded-xl shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 italic">
                  "{story.quote}"
                </blockquote>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{story.author}</span> • {story.role}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {story.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-rose-500">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>

              {story.fullStory && (
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full button-primary"
                >
                  קרא את סיפור ההצלחה המלא
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/brands" 
            className="button-primary inline-flex items-center gap-2"
          >
            צפה בכל המותגים
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Full Story Modal */}
      {selectedStory && selectedStory.fullStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedStory(null)} />
            
            <div className="relative transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all max-w-4xl w-full">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute left-4 top-4 text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={selectedStory.logo} 
                    alt={selectedStory.name}
                    className="w-20 h-20 rounded-xl shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStory.name}</h3>
                    <p className="text-gray-600">{selectedStory.description}</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {selectedStory.fullStory.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">הכלים שהובילו להצלחה</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedStory.fullStory.tools.map((tool, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <img src={tool.icon} alt={tool.name} className="w-10 h-10 rounded-lg" />
                      <div>
                        <h5 className="font-medium text-gray-900">{tool.name}</h5>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}