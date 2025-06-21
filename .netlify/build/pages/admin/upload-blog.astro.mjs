import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { lazy, useState, Suspense } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Dtrkc0M0.mjs';
export { renderers } from '../../renderers.mjs';

lazy(
  () => import('../../chunks/index_3LPS75ge.mjs').then((mod) => ({ default: mod.MinimalTiptapEditor }))
);
const EnhancedBlogUpload = ({ initialData = null, isEditing = false }) => {
  const initialBlogData = {
    title: "",
    title_id: "",
    content: "",
    excerpt: "",
    tags: [],
    categories: [],
    author: "",
    authorImage: null,
    authorImageType: null,
    publishDate: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd'T'HH:mm"),
    isPublished: true,
    seoTitle: "",
    seoDescription: ""
  };
  const [blogData, setBlogData] = useState(initialData || initialBlogData);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5e3);
  };
  const generateTitleId = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };
  const handleInputChange = (field, value) => {
    setBlogData((prevData) => {
      const newData = { ...prevData, [field]: value };
      if (field === "title") {
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
      reader.onerror = (error) => reject(error);
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showNotification("Please select a valid image file", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showNotification("Image size should be less than 2MB", "error");
        return;
      }
      try {
        const base64 = await convertToBase64(file);
        setBlogData((prev) => ({
          ...prev,
          authorImage: base64,
          authorImageType: file.type
        }));
      } catch (error) {
        showNotification("Failed to process image", "error");
      }
    }
  };
  const removeAuthorImage = () => {
    setBlogData((prev) => ({
      ...prev,
      authorImage: null,
      authorImageType: null
    }));
  };
  const handleTagInput = (e, field) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newValue = e.target.value.trim();
      setBlogData((prevData) => {
        if (!prevData[field].includes(newValue)) {
          return {
            ...prevData,
            [field]: [...prevData[field], newValue]
          };
        }
        return prevData;
      });
      e.target.value = "";
    }
  };
  const removeItem = (field, indexToRemove) => {
    setBlogData((prevData) => ({
      ...prevData,
      [field]: prevData[field].filter((_, index) => index !== indexToRemove)
    }));
  };
  const resetForm = () => {
    setBlogData({
      ...initialBlogData,
      publishDate: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd'T'HH:mm")
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = isEditing ? `/api/blogs/${blogData.title_id}` : "/api/blogs";
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
      });
      const data = await response.json();
      if (response.ok) {
        showNotification(`Blog post ${isEditing ? "updated" : "uploaded"} successfully!`);
        if (!isEditing) {
          resetForm();
        }
      } else {
        showNotification(data.error || `Failed to ${isEditing ? "update" : "upload"} blog post`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-neutral-200 py-8", children: [
    notification && /* @__PURE__ */ jsx("div", { className: `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === "error" ? "bg-red-500" : "bg-green-500"} text-white`, children: notification.message }),
    /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto bg-neutral-99 rounded-[64px] shadow-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-h5 lg:text-h4 font-[600] text-neutral-800 mb-8 text-center", children: isEditing ? "Edit Blog Post" : "Create Blog Post" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "title",
              value: blogData.title,
              onChange: (e) => handleInputChange("title", e.target.value),
              placeholder: "Enter blog title",
              required: true,
              className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
            }
          ),
          blogData.title_id && /* @__PURE__ */ jsxs("div", { className: "mt-2 text-bodyextr text-neutral-400", children: [
            "URL: /blogs/",
            blogData.title_id
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "content", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Content" }),
          /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "h-[300px] bg-neutral-200 rounded-lg animate-pulse" }), children: /* @__PURE__ */ jsx("div", { className: "bg-neutral-200 rounded-lg min-h-[300px]", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              value: blogData.content,
              onChange: (e) => handleInputChange("content", e.target.value),
              className: "w-full h-[300px] bg-neutral-200 text-neutral-500 rounded-lg p-6 resize-none border-none",
              placeholder: "Type your content here..."
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "excerpt", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Excerpt" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "excerpt",
              value: blogData.excerpt,
              onChange: (e) => handleInputChange("excerpt", e.target.value),
              placeholder: "Enter a brief excerpt",
              rows: 3,
              className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "tags", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Tags" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "tags",
                onKeyDown: (e) => handleTagInput(e, "tags"),
                placeholder: "Enter tags and press Enter",
                className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: blogData.tags.map((tag, index) => /* @__PURE__ */ jsxs(
              "span",
              {
                className: "bg-neutral-700 bg-opacity-20 text-neutral-600 px-4 py-2 rounded-full text-bodyextr flex items-center",
                children: [
                  tag,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem("tags", index),
                      className: "ml-2 focus:outline-none hover:text-primary",
                      children: /* @__PURE__ */ jsx(X, { size: 16 })
                    }
                  )
                ]
              },
              index
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "categories", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Categories" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "categories",
                onKeyDown: (e) => handleTagInput(e, "categories"),
                placeholder: "Enter categories and press Enter",
                className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: blogData.categories.map((category, index) => /* @__PURE__ */ jsxs(
              "span",
              {
                className: "bg-neutral-700 bg-opacity-20 text-neutral-600 px-4 py-2 rounded-full text-bodyextr flex items-center",
                children: [
                  category,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeItem("categories", index),
                      className: "ml-2 focus:outline-none hover:text-primary",
                      children: /* @__PURE__ */ jsx(X, { size: 16 })
                    }
                  )
                ]
              },
              index
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "author", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Author" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "author",
                value: blogData.author,
                onChange: (e) => handleInputChange("author", e.target.value),
                placeholder: "Enter author name",
                className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "publishDate", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Publish Date" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "publishDate",
                type: "datetime-local",
                value: blogData.publishDate,
                onChange: (e) => handleInputChange("publishDate", e.target.value),
                className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "authorImage", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "Author Image" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: blogData.authorImage ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: blogData.authorImage,
                alt: "Author preview",
                className: "w-20 h-20 rounded-full object-cover border-2 border-gray-300"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-bodyextr text-neutral-600", children: "Image uploaded successfully" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: removeAuthorImage,
                  className: "text-red-500 border border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm",
                  children: "Remove Image"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                id: "authorImage",
                accept: "image/*",
                onChange: handleImageUpload,
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: "authorImage",
                className: "cursor-pointer flex flex-col items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-bodyextr text-neutral-600", children: "Upload author image" }),
                  /* @__PURE__ */ jsx("p", { className: "text-small text-neutral-400", children: "PNG, JPG up to 2MB" })
                ]
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "seoTitle", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "SEO Title" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "seoTitle",
              value: blogData.seoTitle,
              onChange: (e) => handleInputChange("seoTitle", e.target.value),
              placeholder: "Enter SEO title",
              className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "seoDescription", className: "block text-bodysmal font-[500] text-neutral-500 mb-2", children: "SEO Description" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "seoDescription",
              value: blogData.seoDescription,
              onChange: (e) => handleInputChange("seoDescription", e.target.value),
              placeholder: "Enter SEO description",
              rows: 3,
              className: "w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-primary hover:bg-primary-light text-neutral-99 text-bodysmal font-[500] py-6 mb-4 rounded-lg transition-colors disabled:opacity-50",
            disabled: isLoading,
            children: isLoading ? isEditing ? "Updating..." : "Uploading..." : isEditing ? "Update Blog Post" : "Upload Blog Post"
          }
        )
      ] })
    ] }) })
  ] });
};

const prerender = false;
const $$UploadBlog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Upload Blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "EnhancedBlogUpload", EnhancedBlogUpload, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/blogs/EnhancedBlogUpload", "client:component-export": "default" })} ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/upload-blog.astro", void 0);

const $$file = "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/upload-blog.astro";
const $$url = "/admin/upload-blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$UploadBlog,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
