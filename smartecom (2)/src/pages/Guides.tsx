import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/posts';
import { CalendarDays, Clock, ChevronLeft } from 'lucide-react';
import Breadcrumbs, { useBreadcrumbs } from '../components/Breadcrumbs';

export default function Guides() {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4">מדריכים מקצועיים</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/guides/${post.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
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
                
                <div className="mt-4 flex items-center text-rose-500 font-medium">
                  קרא עוד
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}