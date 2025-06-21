import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BTbvIzAy.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/blogs.astro.mjs');
const _page2 = () => import('./pages/admin/edit-blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin/upload-blog.astro.mjs');
const _page5 = () => import('./pages/api/blogs/_slug_.astro.mjs');
const _page6 = () => import('./pages/api/blogs.astro.mjs');
const _page7 = () => import('./pages/blogs/_slug_.astro.mjs');
const _page8 = () => import('./pages/blogs.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/blogs.astro", _page1],
    ["src/pages/admin/edit-blog/[slug].astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/upload-blog.astro", _page4],
    ["src/pages/api/blogs/[slug].js", _page5],
    ["src/pages/api/blogs/index.js", _page6],
    ["src/pages/blogs/[slug].astro", _page7],
    ["src/pages/blogs.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ce359f47-1419-46a7-b80b-72a5756d7a77"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
