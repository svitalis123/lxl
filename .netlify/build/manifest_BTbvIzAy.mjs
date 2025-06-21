import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_BVUKHVVA.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/","cacheDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/node_modules/.astro/","outDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/dist/","srcDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/","publicDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/public/","buildClientDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/dist/","buildServerDir":"file:///media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"}],"routeData":{"route":"/admin/blogs","isIndex":false,"type":"page","pattern":"^\\/admin\\/blogs\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/blogs.astro","pathname":"/admin/blogs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"}],"routeData":{"route":"/admin/edit-blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/admin\\/edit-blog\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"edit-blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/admin/edit-blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"}],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"},{"type":"external","src":"/_astro/upload-blog.xSHusjWf.css"}],"routeData":{"route":"/admin/upload-blog","isIndex":false,"type":"page","pattern":"^\\/admin\\/upload-blog\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"upload-blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/upload-blog.astro","pathname":"/admin/upload-blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/blogs/[slug]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/blogs\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"blogs","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/api/blogs/[slug].js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/blogs","isIndex":true,"type":"endpoint","pattern":"^\\/api\\/blogs\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/blogs/index.js","pathname":"/api/blogs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"}],"routeData":{"route":"/blogs/[slug]","isIndex":false,"type":"page","pattern":"^\\/blogs\\/([^/]+?)\\/?$","segments":[[{"content":"blogs","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blogs/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/blogs.BjvtyEF_.css"}],"routeData":{"route":"/blogs","isIndex":false,"type":"page","pattern":"^\\/blogs\\/?$","segments":[[{"content":"blogs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blogs.astro","pathname":"/blogs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/blogs.astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/edit-blog/[slug].astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/upload-blog.astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/blogs.astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/blogs/[slug].astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/admin/blogs@_@astro":"pages/admin/blogs.astro.mjs","\u0000@astro-page:src/pages/admin/edit-blog/[slug]@_@astro":"pages/admin/edit-blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/admin/login@_@astro":"pages/admin/login.astro.mjs","\u0000@astro-page:src/pages/admin/upload-blog@_@astro":"pages/admin/upload-blog.astro.mjs","\u0000@astro-page:src/pages/api/blogs/[slug]@_@js":"pages/api/blogs/_slug_.astro.mjs","\u0000@astro-page:src/pages/api/blogs/index@_@js":"pages/api/blogs.astro.mjs","\u0000@astro-page:src/pages/blogs/[slug]@_@astro":"pages/blogs/_slug_.astro.mjs","\u0000@astro-page:src/pages/blogs@_@astro":"pages/blogs.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BTbvIzAy.mjs","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CiC7XM3r.mjs","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/editor/minimal-tiptap/index.ts":"_astro/index.BGIIwsBH.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/blogs/EnhancedBlogUpload":"_astro/EnhancedBlogUpload.CULwISGq.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/BlogManagement":"_astro/BlogManagement.D1mMEB-m.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/blogs/RenderIndividualBlog":"_astro/RenderIndividualBlog.mVu7Uwfq.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/blogs/KnowledgeCenter":"_astro/KnowledgeCenter.CJd1B7Fx.js","@astrojs/react/client.js":"_astro/client.BhjlYSTE.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.CVm3K9Um.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/EditBlog.astro?astro&type=script&index=0&lang.ts":"_astro/EditBlog.astro_astro_type_script_index_0_lang.Dctmhn_B.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/AdminHeader.astro?astro&type=script&index=0&lang.ts":"_astro/AdminHeader.astro_astro_type_script_index_0_lang.pqMNnKob.js","/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/scripts/edit-blog.js":"_astro/edit-blog.B3lYkWCe.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const o=document.getElementById(\"login-form\"),t=document.getElementById(\"email\"),n=document.getElementById(\"password\"),a=document.getElementById(\"submit-btn\"),e=document.getElementById(\"error-message\"),s=document.getElementById(\"attempts-warning\");let i=0;const m=2,l=\"admin@example.com\",r=\"your_admin_password\";o&&o.addEventListener(\"submit\",async c=>{c.preventDefault();const u=t?t.value.trim():\"\",f=n?n.value:\"\";if(u===l&&f===r)localStorage.setItem(\"isAuthenticated\",\"true\"),localStorage.setItem(\"authTimestamp\",Date.now().toString()),window.location.href=\"/admin/upload-blog\";else{i++;const d=m-i;d===0?(e&&(e.textContent=\"Maximum login attempts exceeded. Please try again later.\",e.classList.remove(\"hidden\")),s&&s.classList.add(\"hidden\"),t&&(t.disabled=!0),n&&(n.disabled=!0),a&&(a.disabled=!0),setTimeout(()=>{i=0,t&&(t.disabled=!1),n&&(n.disabled=!1),a&&(a.disabled=!1),e&&e.classList.add(\"hidden\")},3e4)):(s&&(s.textContent=`Invalid credentials. ${d} attempt${d===1?\"\":\"s\"} remaining.`,s.classList.remove(\"hidden\")),e&&e.classList.add(\"hidden\"))}})});"],["/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/src/components/admin/AdminHeader.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const t=document.getElementById(\"logout-btn\");t&&t.addEventListener(\"click\",()=>{localStorage.removeItem(\"isAuthenticated\"),localStorage.removeItem(\"authTimestamp\"),window.location.href=\"/admin/login\"});const e=()=>{if(window.location.pathname===\"/admin/login\")return;const a=localStorage.getItem(\"isAuthenticated\"),o=localStorage.getItem(\"authTimestamp\");a===\"true\"&&o&&Date.now()-parseInt(o)<24*60*60*1e3||(localStorage.removeItem(\"isAuthenticated\"),localStorage.removeItem(\"authTimestamp\"),window.location.href=\"/admin/login\")};e(),setInterval(e,5*60*1e3)});"]],"assets":["/_astro/blogs.BjvtyEF_.css","/_astro/upload-blog.xSHusjWf.css","/favicon.svg","/_astro/BlogManagement.D1mMEB-m.js","/_astro/EditBlog.astro_astro_type_script_index_0_lang.Dctmhn_B.js","/_astro/EnhancedBlogUpload.CULwISGq.js","/_astro/KnowledgeCenter.CJd1B7Fx.js","/_astro/RenderIndividualBlog.mVu7Uwfq.js","/_astro/client.BhjlYSTE.js","/_astro/client.fqwnBPme.js","/_astro/createLucideIcon.BBuSYegt.js","/_astro/edit-blog.B3lYkWCe.js","/_astro/index.BGIIwsBH.js","/_astro/index.C_ksqHmP.js","/_astro/index.D4lIrffr.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/preload-helper.BlTxHScW.js","/_astro/x.DV8XECoX.js","/images/66d1bf724d6fc887871467fa_Thunder-SemiBoldLC.woff2","/images/66d1bf86a8b75eb05afe43a5_Geist SemiBold.woff2","/images/66d1bf874f20cb2251e0f9a1_Geist Regular.woff2","/images/66d1bf88abff984fa0464006_Geist Medium.woff2","/images/66d1c127c0a0f7fa9668fc0c_arrow-right.svg","/images/66d1ec27781950cd5dbf0485_Amsterdam.svg","/images/66d1ec283b10413ed7d52b2f_Delaware.svg","/images/66d1ec2e0bfd9600fc12b3d2_Monaco.svg","/images/66d1ec2e10385f4aa68d7c69_Umbrella.svg","/images/66d1ec2e7464f2764df7da61_Springfield.svg","/images/66d1ec2eb2628fd6a556f851_Sweden.svg","/images/66d32fa12eda979c96b21150_client-01.webp","/images/66d32fa22eda979c96b211b7_client-04.webp","/images/66d32fa22eda979c96b211f8_cleint-03.webp","/images/66d32fa22eda979c96b2122d_client-02.webp","/images/66dbc60233d0f03517664235_template-img-08-p-500.webp","/images/66dbc60239706fc65e24a1a9_template-img-10-p-500.webp","/images/66dbc60265f6e9a24846201e_template-img-02-p-500.webp","/images/66dbc60265f6e9a248462047_template-img-01-p-500.webp","/images/66dbc602bd908c9e78599660_template-img-15-p-500.webp","/images/66dbc603185f32d46e810785_template-img-17-p-500.webp","/images/66dbc603185f32d46e8107c5_template-img-18-p-500.webp","/images/66dbc6032d24625a2029a2ad_template-img-16-p-500.webp","/images/66dbc6226ea52df0b9edda6d_template-img-22-p-500.webp","/images/66dbcbdfbd908c9e785e4594_cart.svg","/images/66dbce196ea52df0b9f4266f_alternate-logo.svg","/images/66dbce1ca159a09a51f07a5c_logo.svg","/images/66dbcfdb43c3d4df23b712fa_favicon.svg","/styles/consulthink.main.css","/scripts/jquery.min.js","/scripts/main.js","/images/aboutus/img1.avif","/images/aboutus/img2.avif","/images/aboutus/img3.jpg","/images/aboutus/img4.jpg","/images/aboutus/img5.jpg","/images/homepage/home1.avif","/images/homepage/home10.avif","/images/homepage/home3.avif","/images/homepage/home4.jpg","/images/homepage/home5.avif","/images/homepage/home6.avif","/images/homepage/home7.avif","/images/homepage/home8.avif","/images/homepage/home9.avif","/images/homepage/img2.avif","/images/homepage/logo.png","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"rDjKF1onAvAvVTmjS6uKGrCBHYzo7qFpWh4TcgkiZec=","sessionConfig":{"driver":"fs-lite","options":{"base":"/media/vitalis/E06C86256C85F696/Users/Public/Desktop/projects/fukazee/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
