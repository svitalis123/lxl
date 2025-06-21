import React, { useState, lazy, Suspense } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const MinimalTiptapEditor = lazy(() => import('@/components/editor/minimal-tiptap').then((mod) => ({ default: mod.MinimalTiptapEditor })));

const EnhancedBlogUpload = () => {
  const { toast } = useToast();
  const initialBlogData = {
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    categories: [],
    author: '',
    publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    isPublished: false,
    seoTitle: '',
    seoDescription: '',
  };

  const [blogData, setBlogData] = useState(initialBlogData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setBlogData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleTagInput = (e, field) => {
    e.preventDefault(); // Prevent form submission
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setBlogData(prevData => ({
        ...prevData,
        [field]: [...prevData[field], e.target.value.trim()]
      }));
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
      publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"), // Reset to current date/time
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/upload-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "Blog post uploaded successfully.",
          variant: "success",
        });
        resetForm();
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to upload blog post. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error('Error uploading blog post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    // Prevent form submission when adding tags/categories
    if (e.key === 'Enter' && (e.target.id === 'tags' || e.target.id === 'categories')) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyPress={handleKeyPress} className='bg-primary p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
      <div className='space-y-6'>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={blogData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter blog title"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="content">Content</Label>
          <Suspense fallback={<p>Loading editor...</p>}>
            <MinimalTiptapEditor
              value={blogData.content}
              immediatelyRender={false}
              onChange={(content) => handleInputChange('content', content)}
              className="w-full bg-white text-black rounded-md min-h-[300px]"
              editorContentClassName="p-3"
              output="html"
              placeholder="Type your content here..."
            />
          </Suspense>
        </div>
        
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={blogData.excerpt}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Enter a brief excerpt"
            rows={3}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              onKeyDown={(e) => handleTagInput(e, 'tags')}
              placeholder="Enter tags and press Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {blogData.tags.map((tag, index) => (
                <span key={index} className="bg-transparent text-white px-2 py-1 rounded-full text-sm flex items-center">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeItem('tags', index)} 
                    className="ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <Label htmlFor="categories">Categories</Label>
            <Input
              id="categories"
              onKeyDown={(e) => handleTagInput(e, 'categories')}
              placeholder="Enter categories and press Enter"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {blogData.categories.map((category, index) => (
                <span key={index} className="bg-transparent text-white px-2 py-1 rounded-full text-sm flex items-center">
                  {category}
                  <button 
                    type="button" 
                    onClick={() => removeItem('categories', index)} 
                    className="ml-1 focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={blogData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              placeholder="Enter author name"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input
              id="publishDate"
              type="datetime-local"
              value={blogData.publishDate}
              onChange={(e) => handleInputChange('publishDate', e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <Switch
            id="isPublished"
            checked={blogData.isPublished}
            onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
          />
          <Label htmlFor="isPublished" className="ml-2">Publish immediately</Label>
        </div>

        <div>
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input
            id="seoTitle"
            value={blogData.seoTitle}
            onChange={(e) => handleInputChange('seoTitle', e.target.value)}
            placeholder="Enter SEO title"
          />
        </div>

        <div>
          <Label htmlFor="seoDescription">SEO Description</Label>
          <Textarea
            id="seoDescription"
            value={blogData.seoDescription}
            onChange={(e) => handleInputChange('seoDescription', e.target.value)}
            placeholder="Enter SEO description"
            rows={3}
          />
        </div>
        
        <Button type="submit" className="w-full bg-[#31ac54] hover:bg-[#41b963] !mb-24" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Blog Post'}
        </Button>
      </div>
    </form>
  );
};

export default EnhancedBlogUpload;