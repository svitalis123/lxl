import React from 'react';
import { createRoot } from 'react-dom/client';

// Enhanced Blog Upload Component (inline to avoid import issues)
const EnhancedBlogUpload = ({ initialData = null, isEditing = false }) => {
  const [blogData, setBlogData] = React.useState(initialData || {
    title: '',
    title_id: '',
    content: '',
    excerpt: '',
    tags: [],
    categories: [],
    author: '',
    authorImage: null,
    authorImageType: null,
    publishDate: new Date().toISOString().slice(0, 16),
    isPublished: true,
    seoTitle: '',
    seoDescription: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [notification, setNotification] = React.useState(null);

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
        
        if (isEditing) {
          setTimeout(() => {
            window.location.href = '/admin/blogs';
          }, 2000);
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

  return React.createElement('div', { className: 'w-full' }, [
    notification && React.createElement('div', {
      key: 'notification',
      className: `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white`
    }, notification.message),
    
    React.createElement('form', {
      key: 'form',
      onSubmit: handleSubmit,
      className: 'space-y-6'
    }, [
      // Title
      React.createElement('div', { key: 'title-div' }, [
        React.createElement('label', {
          key: 'title-label',
          htmlFor: 'title',
          className: 'block text-bodysmal font-[500] text-neutral-500 mb-2'
        }, 'Title'),
        React.createElement('input', {
          key: 'title-input',
          id: 'title',
          value: blogData.title,
          onChange: (e) => handleInputChange('title', e.target.value),
          placeholder: 'Enter blog title',
          required: true,
          className: 'w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4'
        }),
        blogData.title_id && React.createElement('div', {
          key: 'url-preview',
          className: 'mt-2 text-bodyextr text-neutral-400'
        }, `URL: /blogs/${blogData.title_id}`)
      ]),

      // Content
      React.createElement('div', { key: 'content-div' }, [
        React.createElement('label', {
          key: 'content-label',
          htmlFor: 'content',
          className: 'block text-bodysmal font-[500] text-neutral-500 mb-2'
        }, 'Content'),
        React.createElement('textarea', {
          key: 'content-textarea',
          value: blogData.content,
          onChange: (e) => handleInputChange('content', e.target.value),
          className: 'w-full h-[300px] bg-neutral-200 text-neutral-500 rounded-lg p-6 resize-none border-none',
          placeholder: 'Type your content here...'
        })
      ]),

      // Excerpt
      React.createElement('div', { key: 'excerpt-div' }, [
        React.createElement('label', {
          key: 'excerpt-label',
          htmlFor: 'excerpt',
          className: 'block text-bodysmal font-[500] text-neutral-500 mb-2'
        }, 'Excerpt'),
        React.createElement('textarea', {
          key: 'excerpt-textarea',
          id: 'excerpt',
          value: blogData.excerpt,
          onChange: (e) => handleInputChange('excerpt', e.target.value),
          placeholder: 'Enter a brief excerpt',
          rows: 3,
          className: 'w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4'
        })
      ]),

      // Author
      React.createElement('div', { key: 'author-div' }, [
        React.createElement('label', {
          key: 'author-label',
          htmlFor: 'author',
          className: 'block text-bodysmal font-[500] text-neutral-500 mb-2'
        }, 'Author'),
        React.createElement('input', {
          key: 'author-input',
          id: 'author',
          value: blogData.author,
          onChange: (e) => handleInputChange('author', e.target.value),
          placeholder: 'Enter author name',
          className: 'w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4'
        })
      ]),

      // Submit Button
      React.createElement('button', {
        key: 'submit-btn',
        type: 'submit',
        className: 'w-full bg-primary hover:bg-primary-light text-neutral-99 text-bodysmal font-[500] py-6 mb-4 rounded-lg transition-colors disabled:opacity-50',
        disabled: isLoading
      }, isLoading 
        ? (isEditing ? 'Updating...' : 'Uploading...') 
        : (isEditing ? 'Update Blog Post' : 'Upload Blog Post')
      )
    ])
  ]);
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('edit-blog-form');
  if (container && window.editBlogData) {
    const root = createRoot(container);
    root.render(React.createElement(EnhancedBlogUpload, { 
      initialData: window.editBlogData, 
      isEditing: true 
    }));
  }
});