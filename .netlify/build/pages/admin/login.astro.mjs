import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BVbjmadu.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login", "description": "community" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-300"> <div class="w-full max-w-md bg-neutral-99 rounded-[64px] shadow-lg"> <div class="p-8"> <h1 class="text-h5 lg:text-h4 font-[600] text-neutral-800 mb-8 text-center">Admin Login</h1> <form id="login-form" class="space-y-6"> <div> <input type="email" id="email" placeholder="Email" required class="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"> </div> <div> <input type="password" id="password" placeholder="Password" required class="w-full bg-neutral-200 border-none text-neutral-500 text-bodymed py-6 rounded-lg px-4"> </div> <button type="submit" id="submit-btn" class="w-full bg-primary hover:bg-primary-light text-neutral-99 text-bodysmal font-[500] py-6 rounded-lg transition-colors">
Sign In
</button> </form> <div id="error-message" class="mt-4 text-red-500 text-center hidden"></div> <div id="attempts-warning" class="mt-4 text-orange-500 text-center hidden"></div> </div> </div> </div> ` })} ${renderScript($$result, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro", void 0);

const $$file = "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
