import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { ChevronDown } from 'lucide-react';
import ToolRecommendation from './ToolRecommendation';
import { featuredApps } from '../data/mockData';
import ContactForm from './ContactForm';

interface BlogPostContentProps {
  post: BlogPost;
  showLeadMagnet: boolean;
  onShowLeadMagnet: () => void;
}

export default function BlogPostContent({ post, showLeadMagnet, onShowLeadMagnet }: BlogPostContentProps) {
  const [openFaq, setOpenFaq] = React.useState<string | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => {
    const handleContactButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-contact-form]')) {
        setIsContactFormOpen(true);
      }
    };

    document.addEventListener('click', handleContactButtonClick);
    return () => document.removeEventListener('click', handleContactButtonClick);
  }, []);

  // Find recommended tools
  const recommendedTools = post.relatedTools
    ? post.relatedTools.map(toolId => featuredApps.find(app => app.id === toolId)).filter(Boolean)
    : [];

  // Process content to handle lead magnet and HTML tags
  const processContent = (content: string) => {
    if (!content) return null;

    // Split content by lead magnet tags if present
    const parts = content.split('<lead-magnet>');
    if (parts.length === 1) {
      return renderContent(content);
    }

    const [before, rest] = parts;
    const [_, after] = rest.split('</lead-magnet>');

    return (
      <>
        {renderContent(before)}
        {post.leadMagnet && (
          <div className="my-12 p-8 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl border border-rose-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{post.leadMagnet.title}</h3>
            <p className="text-lg text-gray-600 mb-6">{post.leadMagnet.description}</p>
            <button
              onClick={onShowLeadMagnet}
              className="button-primary"
            >
              הורד עכשיו
            </button>
          </div>
        )}
        {renderContent(after)}
      </>
    );
  };

  // Render content with proper HTML tags
  const renderContent = (content: string) => {
    // Remove schema.org metadata
    content = content.replace(/<div itemscope.*?<\/div>/s, '');
    
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers
      if (paragraph.startsWith('## ')) {
        return <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6" id={generateId(paragraph.slice(3))}>{paragraph.slice(3)}</h2>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4" id={generateId(paragraph.slice(4))}>{paragraph.slice(4)}</h3>;
      }

      // Handle lists
      if (paragraph.startsWith('• ')) {
        const items = paragraph.split('\n').map(item => item.slice(2));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-600">
            {items.map((item, i) => (
              <li key={i} className="text-lg">{item}</li>
            ))}
          </ul>
        );
      }

      // Regular paragraphs
      return (
        <p key={index} className="text-lg text-gray-600 leading-relaxed mb-6">
          {paragraph}
        </p>
      );
    });
  };

  // Generate URL-friendly IDs for headings
  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^א-תa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <>
      <article className="prose prose-lg max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
          )}
        </div>

        {/* Table of Contents */}
        {post.tableOfContents && (
          <div className="mb-12 bg-gray-50 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-gray-900">{post.tableOfContents.title}</h2>
              <ChevronDown 
                className={`h-6 w-6 text-gray-500 transition-transform ${
                  isTocOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isTocOpen && (
              <nav className="p-6" aria-label="תוכן עניינים">
                <ul className="space-y-3">
                  {post.tableOfContents.items.map((item, index) => (
                    <li key={index}>
                      <a 
                        href={`#${item.id}`}
                        className="text-lg text-gray-700 hover:text-rose-500 transition-colors"
                      >
                        {item.title}
                      </a>
                      {item.items && (
                        <ul className="mr-6 mt-2 space-y-2">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a 
                                href={`#${subItem.id}`}
                                className="text-base text-gray-600 hover:text-rose-500 transition-colors"
                              >
                                {subItem.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}

        {processContent(post.content)}

        {/* Tool Recommendations */}
        {recommendedTools.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">כלים מומלצים</h2>
            {recommendedTools.map((tool, index) => tool && (
              <ToolRecommendation
                key={tool.id}
                name={tool.name}
                icon={tool.icon}
                description={tool.description}
                features={tool.features || []}
                website={tool.website}
              />
            ))}
          </section>
        )}

        {/* FAQs Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">שאלות נפוצות</h2>
            <div className="space-y-4">
              {post.faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.question ? null : faq.question)}
                    className="w-full flex items-center justify-between p-4 text-right bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        openFaq === faq.question ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === faq.question && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
}