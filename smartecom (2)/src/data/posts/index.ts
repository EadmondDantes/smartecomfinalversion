import { BlogPost } from '../../types';
import { aiRecommendationsPost } from './ai-recommendations';
import { buzzMarketingPost } from './buzz-marketing';
import { omnisendGuidePost } from './omnisend-guide';
import { shopifyCostCalculatorPost } from './shopify-cost-calculator';
import { deepseekUsersPost } from './deepseek-users';
import { strongfulSuccessPost } from './strongful-success';
import { adahAcquisitionPost } from './adah-acquisition';
import { productListingOptimizationPost } from './product-listing-optimization';
import { marketingAuditPost } from './marketing-audit';
import { ecommerceDesignPost } from './ecommerce-design';
import { ecommerceExamplesPost } from './ecommerce-examples';
import { shopifyPlusComparisonPost } from './shopify-plus-comparison';

// Import all blog posts here
const posts: BlogPost[] = [
  shopifyPlusComparisonPost, // Add the new post at the beginning since it's the newest
  ecommerceExamplesPost,
  ecommerceDesignPost,
  aiRecommendationsPost,
  marketingAuditPost,
  productListingOptimizationPost,
  buzzMarketingPost,
  omnisendGuidePost,
  shopifyCostCalculatorPost,
  deepseekUsersPost,
  strongfulSuccessPost,
  adahAcquisitionPost
];

// Export posts sorted by date
export const blogPosts = posts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

// Helper functions
export const getRelatedPosts = (currentPost: BlogPost, count: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.tags?.some(tag => currentPost.tags?.includes(tag)))
    .slice(0, count);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags?.includes(tag));
};