import React, { useState } from 'react';
import { motion } from "framer-motion";

const KnowledgeCenter = ({ posts }) => {
  const [activeTab, setActiveTab] = useState('Blogs');

  const truncateText = (text, limit = 25) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const cleanImageUrl = (url) => {
    try {
      if (!url) return "/placeholder-image.jpg";
      
      let decodedUrl = url.replace(/&amp;/g, '&');
      
      if (decodedUrl.includes('/_next/image?url=')) {
        const urlParam = new URL(decodedUrl).searchParams.get('url');
        if (urlParam) {
          return decodeURIComponent(urlParam);
        }
      }
      
      return decodedUrl;
    } catch (error) {
      console.error('Error cleaning URL:', error);
      return "/placeholder-image.jpg";
    }
  };

  const contentData = posts.reduce((acc, post) => {
    if (!acc['Blogs']) acc['Blogs'] = [];
    if (!acc['Case Studies']) acc['Case Studies'] = [];
    if (!acc['Whitepapers']) acc['Whitepapers'] = [];

    const postData = {
      id: post._id,
      title: post.title,
      description: post.excerpt || post.content,
      content: post.content,
      slug: post.title_id,
      categories: post.categories || []
    };

    if (post.categories && post.categories.length > 0) {
      const matchingCategory = post.categories.find(category => 
        ['Blogs', 'Case Studies', 'Whitepapers'].includes(category)
      );

      if (matchingCategory) {
        acc[matchingCategory].push(postData);
      } else {
        acc['Blogs'].push(postData);
      }
    } else {
      acc['Blogs'].push(postData);
    }

    return acc;
  }, {});

  const tabs = ['Blogs', 'Case Studies', 'Whitepapers'];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <h1 className="text-neutral-800 text-body  lg:text-h3 font-[600] mb-2">
          Knowledge Center
        </h1>
        <p className="text-neutral-600 text-body font-[350]">
          Your Source for AI Insights
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="flex justify-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 relative ${
                activeTab === tab ? 'text-neutral-900' : 'text-[#333]'
              } hover:text-primary transition-colors`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
              )}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {contentData[activeTab].map((item) => {
          const rawImageUrl = item.content.match(/src="([^"]+)"/)?.[1] || "";
          const imageUrl = cleanImageUrl(rawImageUrl);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a 
                href={`/blogs/${item.slug}`} 
                className="no-underline hover:no-underline"
              >
                <div className="bg-[#10141f] overflow-hidden shadow-lg max-w-[389px] rounded-[32px] p-4 border-secondary hover:shadow-xl transition-shadow ">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full rounded-[16px] h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff40] via-transparent to-transparent opacity-50" />
                  </div>
                  <div className="p-2">
                    {item.categories && item.categories.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {item.categories.map((category) => (
                          <span
                            key={category}
                            className="bg-neutral-200 text-neutral-800 border-none px-2 py-1 rounded text-xs"
                          >
                            {category.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <h2 className="font-[600] text-neutral-800 text-[24px] mb-3 leading-normal line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-neutral-600 mb-4 text-bodysmal font-normal leading-relaxed line-clamp-3">
                      {truncateText(item.description)}
                    </p>
                    <span className="text-gray-200 font-[500] text-bodysmal hover:text-primary">
                      Read More
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default KnowledgeCenter;