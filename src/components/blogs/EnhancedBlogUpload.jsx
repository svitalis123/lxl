import React, { useState, lazy, Suspense } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const MinimalTiptapEditor = lazy(() => 
  import('../editor/minimal-tiptap').then((mod) => ({ default: mod.MinimalTiptapEditor }))
);

const EnhancedBlogUpload = ({ initialData = null, isEditing = false }) => {
  const initialBlogData = {
    title: '',
    title_id: '',
    content: '',
    excerpt: '',
    tags: [],
    categories: [],
    author: '',
    authorImage: null,
    authorImageType: null,
    publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    isPublished: true,
    seoTitle: '',
    seoDescription: '',
  };

  const [blogData, setBlogData] = useState(initialData || initialBlogData);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const generateTitleId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleInputChange = (field, value) => {
    setBlogData(prevData => {
      const newData = { ...prevData, [field]: value };
      
      if (field === 'title') {
        newData.title_id = generateTitleId(value);
        if (!prevData.seoTitle) {
          newData.seoTitle = value;
        }
      }
      
      return newData;
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showNotification('Image size should be less than 2MB', 'error');
        return;
      }
      
      try {
        const base64 = await convertToBase64(file);
        setBlogData(prev => ({
          ...prev,
          authorImage: base64,
          authorImageType: file.type
        }));
      } catch (error) {
        showNotification('Failed to process image', 'error');
      }
    }
  };

  const removeAuthorImage = () => {
    setBlogData(prev => ({
      ...prev,
      authorImage: null,
      authorImageType: null
    }));
  };

  const handleTagInput = (e, field) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newValue = e.target.value.trim();
      
      setBlogData(prevData => {
        if (!prevData[field].includes(newValue)) {
          return {
            ...prevData,
            [field]: [...prevData[field], newValue]
          };
        }
        return prevData;
      });
      
      e.target.value = '';
    }
  };

  const removeItem = (field, indexToRemove) => {
    setBlogData(prevData => ({
      ...prevData,
      [field]: prevData[field].filter((_, index) => index !== indexToRemove)
    }));
  };

  const resetForm = () => {
    setBlogData({
      ...initialBlogData,
      publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const url = isEditing 
      ? `/api/blogs/${blogData.title_id}`
      : '/api/blogs';
    
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showNotification(`Blog post ${isEditing ? 'updated' : 'uploaded'} successfully!`);
        
        if (!isEditing) {
          resetForm();
        }
      } else {
        showNotification(data.error || `Failed to ${isEditing ? 'update' : 'upload'} blog post`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('An unexpected error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 py-8">
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto bg-neutral-99 rounded-[64px] shadow-lg">
        <div className="p-8">
          <h1 className="text-h5 lg:text-h4 font-[600] text-neutral-800 mb-8 text-center">
            {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Title</label>
              <input
                id="title"
                value={blogData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter blog title"
                required
                className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              />
              {blogData.title_id && (
                <div className="mt-2 text-bodyextr text-neutral-400">
                  URL: /blogs/{blogData.title_id}
                </div>
              )}
            </div>
            
            {/* Content Editor */}
            <div>
              <label htmlFor="content" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Content</label>
              <Suspense fallback={<div className="h-[300px] bg-neutral-200 rounded-lg animate-pulse" />}>
                <div className="bg-neutral-200 rounded-lg min-h-[300px]">
                  <textarea
                    value={blogData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="w-full h-[300px] bg-neutral-200 text-neutral-500 rounded-lg p-6 resize-none border-none"
                    placeholder="Type your content here..."
                  />
                </div>
              </Suspense>
            </div>
            
            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Excerpt</label>
              <textarea
                id="excerpt"
                value={blogData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Enter a brief excerpt"
                rows={3}
                className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              />
            </div>

            {/* Tags and Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tags" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Tags</label>
                <input
                  id="tags"
                  onKeyDown={(e) => handleTagInput(e, 'tags')}
                 placeholder="Enter tags and press Enter"
                 className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
               />
               <div className="flex flex-wrap gap-2 mt-2">
                 {blogData.tags.map((tag, index) => (
                   <span 
                     key={index} 
                     className="bg-neutral-700 bg-opacity-20 text-neutral-600 px-4 py-2 rounded-full text-bodyextr flex items-center"
                   >
                     {tag}
                     <button 
                       type="button" 
                       onClick={() => removeItem('tags', index)} 
                       className="ml-2 focus:outline-none hover:text-primary"
                     >
                       <X size={16} />
                     </button>
                   </span>
                 ))}
               </div>
             </div>
             
             <div>
               <label htmlFor="categories" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Categories</label>
               <input
                 id="categories"
                 onKeyDown={(e) => handleTagInput(e, 'categories')}
                 placeholder="Enter categories and press Enter"
                 className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
               />
               <div className="flex flex-wrap gap-2 mt-2">
                 {blogData.categories.map((category, index) => (
                   <span 
                     key={index} 
                     className="bg-neutral-700 bg-opacity-20 text-neutral-600 px-4 py-2 rounded-full text-bodyextr flex items-center"
                   >
                     {category}
                     <button 
                       type="button" 
                       onClick={() => removeItem('categories', index)} 
                       className="ml-2 focus:outline-none hover:text-primary"
                     >
                       <X size={16} />
                     </button>
                   </span>
                 ))}
               </div>
             </div>
           </div>
           
           {/* Author and Publish Date */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label htmlFor="author" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Author</label>
               <input
                 id="author"
                 value={blogData.author}
                 onChange={(e) => handleInputChange('author', e.target.value)}
                 placeholder="Enter author name"
                 className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
               />
             </div>
             
             <div>
               <label htmlFor="publishDate" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Publish Date</label>
               <input
                 id="publishDate"
                 type="datetime-local"
                 value={blogData.publishDate}
                 onChange={(e) => handleInputChange('publishDate', e.target.value)}
                 className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
               />
             </div>
           </div>

           {/* Author Image Upload Section */}
           <div>
             <label htmlFor="authorImage" className="block text-bodysmal font-[500] text-neutral-500 mb-2">Author Image</label>
             <div className="mt-2">
               {blogData.authorImage ? (
                 <div className="flex items-center gap-4">
                   <img 
                     src={blogData.authorImage} 
                     alt="Author preview" 
                     className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                   />
                   <div className="flex flex-col gap-2">
                     <p className="text-bodyextr text-neutral-600">Image uploaded successfully</p>
                     <button
                       type="button"
                       onClick={removeAuthorImage}
                       className="text-red-500 border border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm"
                     >
                       Remove Image
                     </button>
                   </div>
                 </div>
               ) : (
                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                   <input
                     type="file"
                     id="authorImage"
                     accept="image/*"
                     onChange={handleImageUpload}
                     className="hidden"
                   />
                   <label
                     htmlFor="authorImage"
                     className="cursor-pointer flex flex-col items-center gap-2"
                   >
                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                       <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                       </svg>
                     </div>
                     <p className="text-bodyextr text-neutral-600">Upload author image</p>
                     <p className="text-small text-neutral-400">PNG, JPG up to 2MB</p>
                   </label>
                 </div>
               )}
             </div>
           </div>

           {/* SEO Fields */}
           <div>
             <label htmlFor="seoTitle" className="block text-bodysmal font-[500] text-neutral-500 mb-2">SEO Title</label>
             <input
               id="seoTitle"
               value={blogData.seoTitle}
               onChange={(e) => handleInputChange('seoTitle', e.target.value)}
               placeholder="Enter SEO title"
               className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
             />
           </div>

           <div>
             <label htmlFor="seoDescription" className="block text-bodysmal font-[500] text-neutral-500 mb-2">SEO Description</label>
             <textarea
               id="seoDescription"
               value={blogData.seoDescription}
               onChange={(e) => handleInputChange('seoDescription', e.target.value)}
               placeholder="Enter SEO description"
               rows={3}
               className="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
             />
           </div>
           
           {/* Submit Button */}
           <button 
             type="submit" 
             className="w-full bg-primary hover:bg-primary-light text-neutral-99 text-bodysmal font-[500] py-6 mb-4 rounded-lg transition-colors disabled:opacity-50" 
             disabled={isLoading}
           >
             {isLoading 
               ? (isEditing ? 'Updating...' : 'Uploading...') 
               : (isEditing ? 'Update Blog Post' : 'Upload Blog Post')
             }
           </button>
         </form>
       </div>
     </div>
   </div>
 );
};

export default EnhancedBlogUpload;