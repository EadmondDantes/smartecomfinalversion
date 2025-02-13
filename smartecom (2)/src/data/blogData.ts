import { BlogPost } from '../types';

// Blog post metadata for better SEO and organization
const blogMetadata = {
  baseUrl: 'https://smartecomil.com/guides',
  defaultAuthor: 'צוות SmartEcom',
  defaultImage: 'https://images.unsplash.com/photo-1557568192-225f9f3d9061'
};

// Preserve existing blog posts and add new ones in chronological order
export const blogPosts: BlogPost[] = [
  {
    id: 'omnisend-guide',
    title: 'המדריך המלא לשיווק באמצעות Omnisend',
    excerpt: 'למד כיצד להשתמש ב-Omnisend כדי ליצור קמפיינים אוטומטיים ולהגדיל את המכירות שלך',
    content: `שיווק אימיילים הוא אחד הכלים היעילים ביותר להגדלת מכירות ברשת, עם תשואה ממוצעת של 42 עבור כל 1 שמושקע...`,
    date: '2024-03-15',
    author: blogMetadata.defaultAuthor,
    readingTime: 15,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop',
    seoDescription: 'מדריך מקיף לשימוש ב-Omnisend לשיווק באימייל וSMS, כולל אוטומציות, קמפיינים והגדרות מתקדמות',
    tags: ['email-marketing', 'automation', 'sms-marketing']
  },
  {
    id: 'shopify-cost-calculator',
    title: 'מחשבון עלויות Shopify - כמה באמת עולה להקים חנות?',
    excerpt: 'מחשבון אינטראקטיבי לחישוב העלויות הצפויות להקמת והפעלת חנות Shopify, כולל עלויות פיתוח ואינטגרציות.',
    content: `כמה באמת עולה להקים ולתפעל חנות Shopify? זו שאלה שמעסיקה הרבה בעלי עסקים...`,
    date: '2024-01-25',
    author: blogMetadata.defaultAuthor,
    readingTime: 5,
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1200&h=630&fit=crop',
    calculator: true,
    seoDescription: 'מחשבון מפורט לחישוב עלויות הקמת חנות Shopify, כולל מנוי, עמלות, פיתוח ואינטגרציות',
    tags: ['shopify', 'ecommerce', 'costs']
  },
  {
    id: 'deepseek-users-downloads-2025',
    title: 'Deepseek משתמשים והורדות (ינואר 2025)',
    excerpt: 'האפליקציה של Deepseek רשמה 2.6 מיליון הורדות, ומספר המשתמשים שלה הגיע להערכה של 5-6 מיליון ברחבי העולם.',
    content: `האפליקציה של Deepseek רשמה 2.6 מיליון הורדות, ומספר המשתמשים שלה הגיע להערכה של 5-6 מיליון ברחבי העולם...`,
    date: '2024-01-27',
    author: blogMetadata.defaultAuthor,
    readingTime: 8,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
    seoDescription: 'ניתוח מקיף של נתוני המשתמשים וההורדות של Deepseek לינואר 2025, כולל השוואה למתחרים',
    tags: ['ai', 'analytics', 'market-research']
  },
  {
    id: 'strongful-success-story',
    title: 'סיפור ההצלחה של Strongful: מותג בגדי הספורט המוביל לנשים בישראל',
    excerpt: 'סטרונגפול חוגג ארבע שנים של הצלחה מסחררת והתפתחות מרשימה בשוק האופנה הישראלי',
    content: `סטרונגפול, מותג בגדי הספורט המוביל לנשים בישראל, חוגג ארבע שנים של הצלחה מסחררת והתפתחות מרשימה...`,
    date: '2024-01-29',
    author: 'דור קדם וירדן דויטש - מייסדי Strongful',
    readingTime: 10,
    image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=1200&h=630&fit=crop',
    seoDescription: 'סיפור ההצלחה של מותג בגדי הספורט Strongful, מהקמתו ועד להפיכתו למותג מוביל בישראל',
    tags: ['success-stories', 'fashion', 'ecommerce'],
    relatedTools: ['twik', 'omnisend', 'yotpo', 'glassix', 'opinew', 'back-in-stock']
  },
  {
    id: 'adah-acquisition',
    title: 'טרמינל איקס רוכשת את חברת האיפור הישראלית ADAH',
    excerpt: 'עסקת רכישה בשווי 27 מיליון שקל מדגימה את ההצלחה המטאורית של מותג האיפור הישראלי',
    content: `חברת טרמינל איקס, המפעילה את אתר הסחר של קבוצת פוקס, מממשת את האסטרטגיה של התרחבות באמצעות רכישת חברות קטנות...`,
    date: '2024-01-30',
    author: blogMetadata.defaultAuthor,
    readingTime: 12,
    image: 'https://images.unsplash.com/photo-1589363475296-e32b27dfb89e?w=1200&h=630&fit=crop',
    seoDescription: 'ניתוח עסקת הרכישה של מותג האיפור ADAH על ידי טרמינל איקס בשווי 27 מיליון שקל',
    tags: ['acquisitions', 'beauty', 'ecommerce'],
    relatedTools: ['twik', 'omnisend', 'yotpo', 'glassix']
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Helper function to get related posts
export const getRelatedPosts = (currentPost: BlogPost, count: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.tags?.some(tag => currentPost.tags?.includes(tag)))
    .slice(0, count);
};

// Helper function to get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags?.includes(tag));
};