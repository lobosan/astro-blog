import pLimit from 'p-limit';
import { A as AstroError, U as UnknownContentCollectionError, q as prependForwardSlash } from './astro/assets-service_CvnGY5nI.mjs';
import { c as createComponent, e as renderUniqueStylesheet, f as renderScriptElement, g as createHeadAndContent, r as renderTemplate, d as renderComponent, u as unescapeHTML, m as maybeRenderHead, h as renderSlot, i as renderHead, a as addAttribute, b as createAstro } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md": () => import('./ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live_KfM9jYah.mjs'),"/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md": () => import('./brexit-to-cost-gbp1-200-for-each-person-in-uk_C24__gPt.mjs'),"/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md": () => import('./dont-shut-out-your-community-guide-them-to-civility_BwlRaK8g.mjs'),"/src/content/blog/golden-globes-2024.md": () => import('./golden-globes-2024_B5LJW8HL.mjs'),"/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md": () => import('./here-are-what-media-companies-are-doing-with-covid-19-overload_CSN3oBWP.mjs'),"/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md": () => import('./korean-fusion-delight-homemade-bulgogi-tacos-recipe_CrLVUCth.mjs'),"/src/content/blog/so-you-got-new-engagement-tools-now-what.md": () => import('./so-you-got-new-engagement-tools-now-what_hkzFFMaI.mjs'),"/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md": () => import('./the-microbrewery-scene-in-toronto-is-exploding_DiY3V5cP.mjs'),"/src/content/blog/vf-rams-gameday-follow-the-action-live.md": () => import('./vf-rams-gameday-follow-the-action-live_R4h1vpmX.mjs'),"/src/content/blog/viafoura-fc-live-qa.md": () => import('./viafoura-fc-live-qa_DL9W_R2k.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live":"/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md","brexit-to-cost-gbp1-200-for-each-person-in-uk":"/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md","dont-shut-out-your-community-guide-them-to-civility":"/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md","golden-globes-2024":"/src/content/blog/golden-globes-2024.md","here-are-what-media-companies-are-doing-with-covid-19-overload":"/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md","korean-fusion-delight-homemade-bulgogi-tacos-recipe":"/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md","so-you-got-new-engagement-tools-now-what":"/src/content/blog/so-you-got-new-engagement-tools-now-what.md","the-microbrewery-scene-in-toronto-is-exploding":"/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md","viafoura-fc-live-qa":"/src/content/blog/viafoura-fc-live-qa.md","vf-rams-gameday-follow-the-action-live":"/src/content/blog/vf-rams-gameday-follow-the-action-live.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md": () => import('./ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live_DXbYyq8v.mjs'),"/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md": () => import('./brexit-to-cost-gbp1-200-for-each-person-in-uk_CCUuAUzS.mjs'),"/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md": () => import('./dont-shut-out-your-community-guide-them-to-civility_iRfEuMa9.mjs'),"/src/content/blog/golden-globes-2024.md": () => import('./golden-globes-2024_7lh4mejb.mjs'),"/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md": () => import('./here-are-what-media-companies-are-doing-with-covid-19-overload_CW0smRr5.mjs'),"/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md": () => import('./korean-fusion-delight-homemade-bulgogi-tacos-recipe_BDM2feT9.mjs'),"/src/content/blog/so-you-got-new-engagement-tools-now-what.md": () => import('./so-you-got-new-engagement-tools-now-what_DmphLrS2.mjs'),"/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md": () => import('./the-microbrewery-scene-in-toronto-is-exploding_DmZCRY_V.mjs'),"/src/content/blog/vf-rams-gameday-follow-the-action-live.md": () => import('./vf-rams-gameday-follow-the-action-live_DcznNXlI.mjs'),"/src/content/blog/viafoura-fc-live-qa.md": () => import('./viafoura-fc-live-qa_-yFOoPen.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-14 border-t border-gray-300 bg-gray-50 py-7 text-center text-sm text-gray-400 dark:border-neutral-700 dark:bg-[#1A1A1A]"> <div>Viafoura - Copyright © 2024</div> <div> <a class="privacy-policy" href="https://viafoura.com/privacy-policy" target="_blank">Privacy Policy</a> </div> <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="mt-1 h-6 w-6 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <title>Enable Dark Theme</title> <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> </footer>`;
}, "/Users/santiago/Code/astro/astro-blog/src/components/Footer.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-10 h-16 max-w-full bg-neutral-800 px-4 py-3 dark:bg-[#090909]"> <div class="mx-auto flex max-w-6xl items-center"> <div class="h-10 w-10"> <div class="flex"> <button class="flex items-center" title="Open Menu"> <img class="h-8 w-8" src="/sales-menu.svg" alt="Sales Menu"> </button> </div> </div> <div class="mx-auto h-[30px] w-[150px]"> <a href="/" title="Viafoura"><img src="/white-logo.svg" alt="Viafoura"></a> </div> <div class="h-10 w-10 rounded-full bg-neutral-700 hover:bg-neutral-600"> <div class="viafoura">${renderComponent($$result, "vf-tray-trigger", "vf-tray-trigger", {})}</div> </div> </div> </header>`;
}, "/Users/santiago/Code/astro/astro-blog/src/components/Header.astro", void 0);

const $$TopicsNav = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="-ml-5 flex h-14 items-center justify-center border-b-[1px] border-gray-200 bg-gray-100 text-sm uppercase text-gray-500 dark:border-neutral-700 dark:bg-[#1A1A1A]"> <a href="/topics/media" class="ml-5 font-semibold text-gray-600 hover:underline dark:text-white">Media</a><a href="/topics/news" class="ml-5 font-semibold text-gray-600 hover:underline dark:text-white">News</a><a href="/topics/politics" class="ml-5 font-semibold text-gray-600 hover:underline dark:text-white">Politics</a><a href="/topics/sports" class="ml-5 font-semibold text-gray-600 hover:underline dark:text-white">Sports</a><a href="/topics/travel" class="ml-5 font-semibold text-gray-600 hover:underline dark:text-white">Travel</a> </nav>`;
}, "/Users/santiago/Code/astro/astro-blog/src/components/TopicsNav.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, vfContainerId } = Astro2.props;
  const site = {
    name: "Viafoura Demo",
    description: "Viafoura Demo Site to showcase best practices for all of our community tools"
  };
  return renderTemplate(_a || (_a = __template([' <html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex"><meta name="description"', '><meta name="vf:domain" content="demo.viafoura.com">', '<meta property="og:url" content="https://demo.viafoura.com/"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image" content="/src/images/viafoura-demo.webp"><meta property="og:image:alt"', '><meta property="og:type" content="website"><meta property="og:site_name"', "><title>", '</title><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"><script src="/scripts/darkMode.js"><\/script>', "</head> <body> ", " ", ' <main class="container mx-auto mt-7 min-h-[calc(100vh-310px)] max-w-6xl px-5"> ', " </main> ", ' <script async src="//cdn.viafoura.net/entry/index.js"><\/script> </body> </html>'])), addAttribute(site.description, "content"), vfContainerId && renderTemplate`<meta name="vf:container_id"${addAttribute(vfContainerId, "content")}>`, addAttribute(title, "content"), addAttribute(site.description, "content"), addAttribute(site.name, "content"), addAttribute(site.name, "content"), title, renderHead(), renderComponent($$result, "Header", $$Header, {}), renderComponent($$result, "TopicsNav", $$TopicsNav, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/santiago/Code/astro/astro-blog/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, getCollection as g };
