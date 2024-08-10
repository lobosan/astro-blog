import 'cookie';
import 'kleur/colors';
import { parse } from 'devalue';
import { D as DEFAULT_404_COMPONENT } from './astro/server_DVnfWoNJ.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
const statusToCodeMap = Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);
class ActionError extends Error {
  type = "AstroActionError";
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(params) {
    super(params.message);
    this.code = params.code;
    this.status = ActionError.codeToStatus(params.code);
    if (params.stack) {
      this.stack = params.stack;
    }
  }
  static codeToStatus(code) {
    return codeToStatusMap[code];
  }
  static statusToCode(status) {
    return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
  }
  static fromJson(body) {
    if (isInputError(body)) {
      return new ActionInputError(body.issues);
    }
    if (isActionError(body)) {
      return new ActionError(body);
    }
    return new ActionError({
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
function isActionError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
  return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
class ActionInputError extends ActionError {
  type = "AstroActionInputError";
  // We don't expose all ZodError properties.
  // Not all properties will serialize from server to client,
  // and we don't want to import the full ZodError object into the client.
  issues;
  fields;
  constructor(issues) {
    super({
      message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
      code: "BAD_REQUEST"
    });
    this.issues = issues;
    this.fields = {};
    for (const issue of issues) {
      if (issue.path.length > 0) {
        const key = issue.path[0].toString();
        this.fields[key] ??= [];
        this.fields[key]?.push(issue.message);
      }
    }
  }
}
function getActionQueryString(name) {
  const searchParams = new URLSearchParams({ _astroAction: name });
  return `?${searchParams.toString()}`;
}
function deserializeActionResult(res) {
  if (res.type === "error") {
    return { error: ActionError.fromJson(JSON.parse(res.body)), data: void 0 };
  }
  if (res.type === "empty") {
    return { data: void 0, error: void 0 };
  }
  return {
    data: parse(res.body, {
      URL: (href) => new URL(href)
    }),
    error: void 0
  };
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
    isIndex: rawRouteData.isIndex
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/santiago/Code/astro/astro-blog/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.PsoglJI_.js"}],"styles":[{"type":"inline","content":".twic-i{overflow:hidden}.twic-w,.twic-w *{border:none;margin:0;overflow:hidden;padding:0}.twic-w{overflow:hidden;position:relative;padding-top:100%;width:100%;padding-top:calc(100% / var(--twic-ratio,1))}.twic-w>*{display:block;height:100%;left:0;position:absolute;top:0;width:100%;transition-property:opacity,transform;will-change:opacity,transform;background-size:cover;background-position:center;background-repeat:no-repeat;-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center;transition-delay:0s;transition-duration:.4s;transition-timing-function:ease;-o-object-fit:var(--twic-mode,cover);object-fit:var(--twic-mode,cover);-o-object-position:var(--twic-position,center);object-position:var(--twic-position,center);transition-delay:var(--twic-transition-delay,0s);transition-duration:var(--twic-transition-duration,.4s);transition-timing-function:var(--twic-transition-timing-function,ease)}.twic-w>div{background-repeat:no-repeat;background-size:cover;background-position:center;background-size:var(--twic-mode,cover);background-position:var(--twic-position,center);font-size:calc(1px / var(--twic-ratio,1))}.twic-w>img:not([src]),.twic-w>img[src=\"\"]{visibility:hidden}.twic-w.twic-tz>img{transform:scale(0)}.twic-w.twic-tf>div{opacity:1}.twic-d{display:block}.twic-offline{background-color:#ccc}.twic-offline.twic-nosrc{background-color:#fd0016}.twic-offline>*{display:none}:root{--twic-zoom:0}.twic-z{position:relative}.twic-m{left:0;position:absolute;top:0;z-index:1}.twic-m>*{display:none;transition:none;width:calc(max(var(--twic-zoom),1)*100%);height:calc(max(var(--twic-zoom),1)*100%);transform:translate3d(calc((1 - max(var(--twic-zoom),1)) * var(--twic-xr,0) * 1px),calc((1 - max(var(--twic-zoom),1)) * var(--twic-yr,0) * 1px),0)}.twic-m:hover>*{display:block}.twic-m:hover+div,twicmedia:hover+twicmedia{opacity:0}.twic-p{border:none;margin:0;overflow:hidden;padding:0}.twic-p>img{display:block;-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center;width:100%;height:100%}\n"},{"type":"external","src":"/_astro/index.CLoqxRwM.css"}],"routeData":{"route":"/posts/[...slug]","isIndex":false,"type":"page","pattern":"^\\/posts(?:\\/(.*?))?\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/posts/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.PsoglJI_.js"}],"styles":[{"type":"inline","content":".twic-i{overflow:hidden}.twic-w,.twic-w *{border:none;margin:0;overflow:hidden;padding:0}.twic-w{overflow:hidden;position:relative;padding-top:100%;width:100%;padding-top:calc(100% / var(--twic-ratio,1))}.twic-w>*{display:block;height:100%;left:0;position:absolute;top:0;width:100%;transition-property:opacity,transform;will-change:opacity,transform;background-size:cover;background-position:center;background-repeat:no-repeat;-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center;transition-delay:0s;transition-duration:.4s;transition-timing-function:ease;-o-object-fit:var(--twic-mode,cover);object-fit:var(--twic-mode,cover);-o-object-position:var(--twic-position,center);object-position:var(--twic-position,center);transition-delay:var(--twic-transition-delay,0s);transition-duration:var(--twic-transition-duration,.4s);transition-timing-function:var(--twic-transition-timing-function,ease)}.twic-w>div{background-repeat:no-repeat;background-size:cover;background-position:center;background-size:var(--twic-mode,cover);background-position:var(--twic-position,center);font-size:calc(1px / var(--twic-ratio,1))}.twic-w>img:not([src]),.twic-w>img[src=\"\"]{visibility:hidden}.twic-w.twic-tz>img{transform:scale(0)}.twic-w.twic-tf>div{opacity:1}.twic-d{display:block}.twic-offline{background-color:#ccc}.twic-offline.twic-nosrc{background-color:#fd0016}.twic-offline>*{display:none}:root{--twic-zoom:0}.twic-z{position:relative}.twic-m{left:0;position:absolute;top:0;z-index:1}.twic-m>*{display:none;transition:none;width:calc(max(var(--twic-zoom),1)*100%);height:calc(max(var(--twic-zoom),1)*100%);transform:translate3d(calc((1 - max(var(--twic-zoom),1)) * var(--twic-xr,0) * 1px),calc((1 - max(var(--twic-zoom),1)) * var(--twic-yr,0) * 1px),0)}.twic-m:hover>*{display:block}.twic-m:hover+div,twicmedia:hover+twicmedia{opacity:0}.twic-p{border:none;margin:0;overflow:hidden;padding:0}.twic-p>img{display:block;-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center;width:100%;height:100%}\n"},{"type":"external","src":"/_astro/index.CLoqxRwM.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/santiago/Code/astro/astro-blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/santiago/Code/astro/astro-blog/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/santiago/Code/astro/astro-blog/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/Users/santiago/Code/astro/astro-blog/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md?astroContentCollectionEntry=true":"chunks/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live_KfM9jYah.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md?astroContentCollectionEntry=true":"chunks/brexit-to-cost-gbp1-200-for-each-person-in-uk_C24__gPt.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md?astroContentCollectionEntry=true":"chunks/dont-shut-out-your-community-guide-them-to-civility_BwlRaK8g.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/golden-globes-2024.md?astroContentCollectionEntry=true":"chunks/golden-globes-2024_B5LJW8HL.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md?astroContentCollectionEntry=true":"chunks/here-are-what-media-companies-are-doing-with-covid-19-overload_CSN3oBWP.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md?astroContentCollectionEntry=true":"chunks/korean-fusion-delight-homemade-bulgogi-tacos-recipe_CrLVUCth.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/so-you-got-new-engagement-tools-now-what.md?astroContentCollectionEntry=true":"chunks/so-you-got-new-engagement-tools-now-what_hkzFFMaI.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md?astroContentCollectionEntry=true":"chunks/the-microbrewery-scene-in-toronto-is-exploding_DiY3V5cP.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/vf-rams-gameday-follow-the-action-live.md?astroContentCollectionEntry=true":"chunks/vf-rams-gameday-follow-the-action-live_R4h1vpmX.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/viafoura-fc-live-qa.md?astroContentCollectionEntry=true":"chunks/viafoura-fc-live-qa_DL9W_R2k.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md?astroPropagatedAssets":"chunks/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live_DXbYyq8v.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md?astroPropagatedAssets":"chunks/brexit-to-cost-gbp1-200-for-each-person-in-uk_CCUuAUzS.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md?astroPropagatedAssets":"chunks/dont-shut-out-your-community-guide-them-to-civility_iRfEuMa9.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/golden-globes-2024.md?astroPropagatedAssets":"chunks/golden-globes-2024_7lh4mejb.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md?astroPropagatedAssets":"chunks/here-are-what-media-companies-are-doing-with-covid-19-overload_CW0smRr5.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md?astroPropagatedAssets":"chunks/korean-fusion-delight-homemade-bulgogi-tacos-recipe_BDM2feT9.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/so-you-got-new-engagement-tools-now-what.md?astroPropagatedAssets":"chunks/so-you-got-new-engagement-tools-now-what_DmphLrS2.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md?astroPropagatedAssets":"chunks/the-microbrewery-scene-in-toronto-is-exploding_DmZCRY_V.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/vf-rams-gameday-follow-the-action-live.md?astroPropagatedAssets":"chunks/vf-rams-gameday-follow-the-action-live_DcznNXlI.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/viafoura-fc-live-qa.md?astroPropagatedAssets":"chunks/viafoura-fc-live-qa_-yFOoPen.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md":"chunks/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live_ClmRJtH0.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md":"chunks/brexit-to-cost-gbp1-200-for-each-person-in-uk_KMDiAfov.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md":"chunks/dont-shut-out-your-community-guide-them-to-civility_tyCNBKVS.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/golden-globes-2024.md":"chunks/golden-globes-2024_ChOfFmQX.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md":"chunks/here-are-what-media-companies-are-doing-with-covid-19-overload_DZkWXOeg.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md":"chunks/korean-fusion-delight-homemade-bulgogi-tacos-recipe_DZd_6_FT.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/so-you-got-new-engagement-tools-now-what.md":"chunks/so-you-got-new-engagement-tools-now-what_CFRlW2J4.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md":"chunks/the-microbrewery-scene-in-toronto-is-exploding_Ccks2_k6.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/vf-rams-gameday-follow-the-action-live.md":"chunks/vf-rams-gameday-follow-the-action-live_BeEOMvTx.mjs","/Users/santiago/Code/astro/astro-blog/src/content/blog/viafoura-fc-live-qa.md":"chunks/viafoura-fc-live-qa_BX0QZN6i.mjs","\u0000@astrojs-manifest":"manifest_BZ0HLIS8.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.PsoglJI_.js","@twicpics/components/react":"_astro/react.KIT8iyWt.js","@astrojs/react/client.js":"_astro/client.VBMNy0j7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/inter-greek-ext-wght-normal.CGAr0uHJ.woff2","/_astro/inter-greek-wght-normal.CaVNZxsx.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-cyrillic-ext-wght-normal.B2xhLi22.woff2","/_astro/inter-latin-ext-wght-normal.CFHvXkgd.woff2","/_astro/inter-latin-wght-normal.C2S99t-D.woff2","/_astro/inter-cyrillic-wght-normal.CMZtQduZ.woff2","/_astro/index.CLoqxRwM.css","/favicon.ico","/sales-menu.svg","/white-logo.svg","/_astro/client.VBMNy0j7.js","/_astro/hoisted.PsoglJI_.js","/_astro/index.DlAYGZ0P.js","/_astro/react.Dsf2Cqb7.js","/_astro/react.KIT8iyWt.js","/scripts/darkMode.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { DEFAULT_404_ROUTE as D, default404Instance as a, deserializeActionResult as d, ensure404Route as e, getActionQueryString as g, manifest as m };
