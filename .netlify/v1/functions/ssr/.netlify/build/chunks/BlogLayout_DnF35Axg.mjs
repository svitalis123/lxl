import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, o as renderSlot } from './astro/server_BVUKHVVA.mjs';
import 'kleur/colors';
import { $ as $$Layout, a as $$Navigation } from './Layout_BVbjmadu.mjs';

const $$Astro = createAstro();
const $$BlogLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Navigation, {})} ${maybeRenderHead()}<main> ${renderSlot($$result2, $$slots["default"])} </main> ` })}`;
}, "/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/layouts/BlogLayout.astro", void 0);

export { $$BlogLayout as $ };
