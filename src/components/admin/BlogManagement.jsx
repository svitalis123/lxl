import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        showNotification('Failed to fetch blog posts', 'error');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showNotification('An unexpected error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (titleId) => {
    window.location.href = `/admin/edit-blog/${titleId}`;
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(`/api/blogs/${blogToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showNotification('Blog post deleted successfully');
        fetchBlogs();
      } else {
        throw new Error('Failed to delete blog post');
      }
    } catch (error) {
      showNotification(error.message || 'Failed to delete blog post', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const confirmDelete = (titleId) => {
    setBlogToDelete(titleId);
    setDeleteDialogOpen(true);
  };

  const StatusIndicator = ({ status }) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'Published' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status}
    </span>
  );

  return (
    <>
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <div className="w-full bg-neutral-99 rounded-[32px] shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-h5 lg:text-h4 font-[600] text-neutral-800">Manage Blog Posts</h1>
            <a 
              href="/admin/upload-blog"
              className="bg-primary hover:bg-primary-light text-neutral-99 px-4 py-2 rounded-lg transition-colors"
            >
              Create New Post
            </a>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Author</th>
                    <th className="text-left py-3 px-4">Published</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{blog.title}</td>
                      <td className="py-3 px-4">{blog.author}</td>
                      <td className="py-3 px-4">
                        <StatusIndicator status={blog.isPublished ? 'Published' : 'Draft'} />
                      </td>
                      <td className="py-3 px-4">
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleEdit(blog.title_id)}
                          className="mr-2 p-2 text-gray-600 hover:text-primary transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete(blog.title_id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete the blog post.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogManagement;