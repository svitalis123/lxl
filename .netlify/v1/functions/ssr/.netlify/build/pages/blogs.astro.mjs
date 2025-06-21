import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { $ as $$BlogLayout } from '../chunks/BlogLayout_DnF35Axg.mjs';
import { c as clientPromise } from '../chunks/mongodb_BYzvVdGx.mjs';
export { renderers } from '../renderers.mjs';

const KnowledgeCenter = ({ posts }) => {
  const [activeTab, setActiveTab] = useState("Blogs");
  const truncateText = (text, limit = 25) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  const cleanImageUrl = (url) => {
    try {
      if (!url) return "/placeholder-image.jpg";
      let decodedUrl = url.replace(/&amp;/g, "&");
      if (decodedUrl.includes("/_next/image?url=")) {
        const urlParam = new URL(decodedUrl).searchParams.get("url");
        if (urlParam) {
          return decodeURIComponent(urlParam);
        }
      }
      return decodedUrl;
    } catch (error) {
      console.error("Error cleaning URL:", error);
      return "/placeholder-image.jpg";
    }
  };
  const contentData = posts.reduce((acc, post) => {
    if (!acc["Blogs"]) acc["Blogs"] = [];
    if (!acc["Case Studies"]) acc["Case Studies"] = [];
    if (!acc["Whitepapers"]) acc["Whitepapers"] = [];
    const postData = {
      id: post._id,
      title: post.title,
      description: post.excerpt || post.content,
      content: post.content,
      slug: post.title_id,
      categories: post.categories || []
    };
    if (post.categories && post.categories.length > 0) {
      const matchingCategory = post.categories.find(
        (category) => ["Blogs", "Case Studies", "Whitepapers"].includes(category)
      );
      if (matchingCategory) {
        acc[matchingCategory].push(postData);
      } else {
        acc["Blogs"].push(postData);
      }
    } else {
      acc["Blogs"].push(postData);
    }
    return acc;
  }, {});
  const tabs = ["Blogs", "Case Studies", "Whitepapers"];
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl mx-auto px-4 pt-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "text-center py-8",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-neutral-800 text-body  lg:text-h3 font-[600] mb-2", children: "Knowledge Center" }),
          /* @__PURE__ */ jsx("p", { className: "text-neutral-600 text-body font-[350]", children: "Your Source for AI Insights" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "relative mb-8",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-8", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setActiveTab(tab),
              className: `pb-2 relative ${activeTab === tab ? "text-neutral-900" : "text-[#333]"} hover:text-primary transition-colors`,
              children: [
                tab,
                activeTab === tab && /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-1 bg-primary" })
              ]
            },
            tab
          )) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-[2px] bg-secondary" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
        className: "grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
        children: contentData[activeTab].map((item) => {
          const rawImageUrl = item.content.match(/src="([^"]+)"/)?.[1] || "";
          const imageUrl = cleanImageUrl(rawImageUrl);
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: `/blogs/${item.slug}`,
                  className: "no-underline hover:no-underline",
                  children: /* @__PURE__ */ jsxs("div", { className: "bg-[#10141f] overflow-hidden shadow-lg max-w-[389px] rounded-[32px] p-4 border-secondary hover:shadow-xl transition-shadow ", children: [
                    /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: imageUrl,
                          alt: item.title,
                          className: "w-full rounded-[16px] h-full object-cover"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#ffffff40] via-transparent to-transparent opacity-50" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                      item.categories && item.categories.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 mb-3", children: item.categories.map((category) => /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "bg-neutral-200 text-neutral-800 border-none px-2 py-1 rounded text-xs",
                          children: category.toUpperCase()
                        },
                        category
                      )) }),
                      /* @__PURE__ */ jsx("h2", { className: "font-[600] text-neutral-800 text-[24px] mb-3 leading-normal line-clamp-2", children: item.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-neutral-600 mb-4 text-bodysmal font-normal leading-relaxed line-clamp-3", children: truncateText(item.description) }),
                      /* @__PURE__ */ jsx("span", { className: "text-gray-200 font-[500] text-bodysmal hover:text-primary", children: "Read More" })
                    ] })
                  ] })
                }
              )
            },
            item.id
          );
        })
      }
    )
  ] });
};

const prerender = false;
const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  async function getPosts() {
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    return await collection.find({}).sort({ createdAt: -1 }).toArray();
  }
  const posts = await getPosts();
  const serializedPosts = JSON.parse(JSON.stringify(posts));
  return renderTemplate`${renderComponent($$result, "BlogLayout", $$BlogLayout, { "title": "Knowledge Center", "description": "Explore our blogs, case studies, and whitepapers" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-[#1a3e5c] w-full py-4 lg:py-12 overflow-hidden"> ${renderComponent($$result2, "KnowledgeCenter", KnowledgeCenter, { "posts": serializedPosts, "client:load": true, "client:component-hydration": "load", "client:component-path": "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/blogs/KnowledgeCenter", "client:component-export": "default" })} </div> ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/blogs.astro", void 0);

const $$file = "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/blogs.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
