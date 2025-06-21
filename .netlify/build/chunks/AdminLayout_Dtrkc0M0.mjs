import { e as createComponent, f as createAstro, m as maybeRenderHead, l as renderScript, h as addAttribute, r as renderTemplate, k as renderComponent, o as renderSlot } from './astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_BVbjmadu.mjs';
import 'clsx';

const $$Astro$1 = createAstro();
const $$AdminHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AdminHeader;
  const currentPath = Astro2.url.pathname;
  const navigation = [
    { name: "Upload Blog", path: "/admin/upload-blog" },
    { name: "Manage Blogs", path: "/admin/blogs" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="py-4 mb-6 border-b border-gray-700"> <div class="container mx-auto px-4"> <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"> <h3 class="text-h5 lg:text-h4 font-[500] text-neutral-800">
Admin Dashboard
</h3> <div class="flex items-center space-x-4"> <nav class="flex space-x-2"> ${navigation.map((item) => renderTemplate`<a${addAttribute(item.path, "href")}${addAttribute(`px-4 py-2 rounded transition-colors ${currentPath === item.path ? "bg-primary text-neutral-99" : "text-neutral-800 hover:bg-primary hover:text-neutral-99"} text-bodysmal`, "class")}> ${item.name} </a>`)} </nav> <button id="logout-btn" class="bg-primary hover:bg-primary-light text-neutral-99 text-bodysmal px-4 py-2 rounded transition-colors">
Logout
</button> </div> </div> </div> </header> ${renderScript($$result, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/AdminHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/AdminHeader.astro", void 0);

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-neutral-200"> ${renderComponent($$result2, "AdminHeader", $$AdminHeader, {})} <div class="container mx-auto px-4"> ${renderSlot($$result2, $$slots["default"])} </div> </div> ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
