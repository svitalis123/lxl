import { e as createComponent, f as createAstro, r as renderTemplate, l as renderScript, n as defineScriptVars, m as maybeRenderHead, k as renderComponent } from '../../../chunks/astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_Dtrkc0M0.mjs';
import 'clsx';
import { c as clientPromise } from '../../../chunks/mongodb_BYzvVdGx.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$EditBlog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EditBlog;
  const { blogData } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div class="min-h-screen bg-neutral-200 py-8"> <div class="max-w-4xl mx-auto bg-neutral-99 rounded-[64px] shadow-lg"> <div class="p-8"> <h1 class="text-h5 lg:text-h4 font-[600] text-neutral-800 mb-8 text-center">\nEdit Blog Post\n</h1> <div id="edit-blog-form"></div> </div> </div> </div> <script>(function(){', "\n  // Store blog data globally for the React component\n  window.editBlogData = blogData;\n})();<\/script> ", ""])), maybeRenderHead(), defineScriptVars({ blogData }), renderScript($$result, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/EditBlog.astro?astro&type=script&index=0&lang.ts"));
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/EditBlog.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  async function getBlogPost(slug2) {
    const client = await clientPromise;
    const db = client.db("blogDatabase");
    const collection = db.collection("posts");
    return await collection.findOne({ title_id: slug2 });
  }
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/admin/blogs");
  }
  const blog = await getBlogPost(slug);
  if (!blog) {
    return Astro2.redirect("/admin/blogs");
  }
  const serializedBlog = JSON.parse(JSON.stringify(blog));
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Edit Blog" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "EditBlog", $$EditBlog, { "blogData": serializedBlog })} ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/edit-blog/[slug].astro", void 0);

const $$file = "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/edit-blog/[slug].astro";
const $$url = "/admin/edit-blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
