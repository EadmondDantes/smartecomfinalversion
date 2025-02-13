import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from '../data/posts';
import { CalendarDays, Clock } from 'lucide-react';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';
import ShopifyCostCalculator from '../components/ShopifyCostCalculator';
import LeadMagnetForm from '../components/LeadMagnetForm';
import BlogPostContent from '../components/BlogPostContent';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);
  const breadcrumbs = useBreadcrumbs();
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  if (!post) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">מדריך לא נמצא</h1>
        </div>
      </div>
    );
  }

  // Update the last breadcrumb label to be the post title
  if (breadcrumbs.length > 0) {
    breadcrumbs[breadcrumbs.length - 1].label = post.title;
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('he-IL')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} דקות קריאה</span>
              </div>
            </div>

            <BlogPostContent
              post={post}
              showLeadMagnet={showLeadMagnet}
              onShowLeadMagnet={() => setShowLeadMagnet(true)}
            />

            {post.calculator && (
              <div className="mt-8">
                <ShopifyCostCalculator />
              </div>
            )}
          </div>
        </article>
      </div>

      {showLeadMagnet && post.leadMagnet && (
        <LeadMagnetForm
          title={post.leadMagnet.title}
          description={post.leadMagnet.description}
          fileUrl={post.leadMagnet.fileUrl}
          onClose={() => setShowLeadMagnet(false)}
        />
      )}
    </div>
  );
}