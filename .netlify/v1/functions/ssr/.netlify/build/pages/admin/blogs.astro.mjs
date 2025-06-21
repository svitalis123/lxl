import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Dtrkc0M0.mjs';
export { renderers } from '../../renderers.mjs';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5e3);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        showNotification("Failed to fetch blog posts", "error");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showNotification("An unexpected error occurred", "error");
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
        method: "DELETE"
      });
      if (response.ok) {
        showNotification("Blog post deleted successfully");
        fetchBlogs();
      } else {
        throw new Error("Failed to delete blog post");
      }
    } catch (error) {
      showNotification(error.message || "Failed to delete blog post", "error");
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };
  const confirmDelete = (titleId) => {
    setBlogToDelete(titleId);
    setDeleteDialogOpen(true);
  };
  const StatusIndicator = ({ status }) => /* @__PURE__ */ jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`, children: status });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    notification && /* @__PURE__ */ jsx("div", { className: `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === "error" ? "bg-red-500" : "bg-green-500"} text-white`, children: notification.message }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-neutral-99 rounded-[32px] shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-h5 lg:text-h4 font-[600] text-neutral-800", children: "Manage Blog Posts" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/admin/upload-blog",
            className: "bg-primary hover:bg-primary-light text-neutral-99 px-4 py-2 rounded-lg transition-colors",
            children: "Create New Post"
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: "Loading..." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left py-3 px-4", children: "Title" }),
          /* @__PURE__ */ jsx("th", { className: "text-left py-3 px-4", children: "Author" }),
          /* @__PURE__ */ jsx("th", { className: "text-left py-3 px-4", children: "Published" }),
          /* @__PURE__ */ jsx("th", { className: "text-left py-3 px-4", children: "Date" }),
          /* @__PURE__ */ jsx("th", { className: "text-right py-3 px-4", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: blogs.map((blog) => /* @__PURE__ */ jsxs("tr", { className: "border-b hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "py-3 px-4 font-medium", children: blog.title }),
          /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: blog.author }),
          /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsx(StatusIndicator, { status: blog.isPublished ? "Published" : "Draft" }) }),
          /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: new Date(blog.publishDate).toLocaleDateString() }),
          /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 text-right", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleEdit(blog.title_id),
                className: "mr-2 p-2 text-gray-600 hover:text-primary transition-colors",
                children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => confirmDelete(blog.title_id),
                className: "p-2 text-red-500 hover:text-red-700 transition-colors",
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }, blog._id)) })
      ] }) })
    ] }) }),
    deleteDialogOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Are you sure?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "This action cannot be undone. This will permanently delete the blog post." }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setDeleteDialogOpen(false),
            className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleDelete,
            className: "px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg transition-colors",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
};

const prerender = false;
const $$Blogs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Manage Blogs" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogManagement", BlogManagement, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/BlogManagement", "client:component-export": "default" })} ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/blogs.astro", void 0);

const $$file = "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/blogs.astro";
const $$url = "/admin/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
