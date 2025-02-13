export interface FAQ {
  question: string;
  answer: string;
}

export type Category = 
  | 'optimization'
  | 'marketing'
  | 'reviews'
  | 'support'
  | 'loyalty'
  | 'design'
  | 'operations'
  | 'seo'
  | 'email'
  | 'analytics'
  | 'popups'
  | 'ugc'
  | 'dropshipping';

export const categoryLabels: Record<Category, string> = {
  optimization: 'אופטימיזציה',
  marketing: 'שיווק',
  reviews: 'חוות דעת',
  support: 'שירות לקוחות',
  loyalty: 'מועדוני לקוחות',
  design: 'עיצוב',
  operations: 'תפעול',
  seo: 'קידום אורגני',
  email: 'אימייל וסמס',
  analytics: 'אנליטיקס',
  popups: 'פופ-אפים',
  ugc: 'UGC',
  dropshipping: 'דרופשיפינג'
};

export interface LeadForm {
  firstName: string;
  websiteUrl: string;
  email: string;
  appId: string;
}

export interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  website?: string;
  categories: Category[];
  discountAvailable?: boolean;
  image?: string;
  blogPost?: BlogPost;
  editorsPick?: boolean;
  features?: string[];
  carousel?: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  apps: App[];
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
  author: string;
  readingTime?: number;
  image?: string;
  calculator?: boolean;
  leadMagnet?: {
    title: string;
    description: string;
    fileUrl: string;
  };
  seoDescription?: string;
  tags?: string[];
  relatedTools?: string[];
  tableOfContents?: {
    title: string;
    items: {
      title: string;
      id: string;
      items?: {
        title: string;
        id: string;
      }[];
    }[];
  };
  faqs?: FAQ[];
}