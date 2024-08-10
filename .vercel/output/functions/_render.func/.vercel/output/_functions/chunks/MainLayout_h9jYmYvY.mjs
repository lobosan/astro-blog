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
lookupMap = {"blog":{"type":"content","entries":{"ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live":"/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md","brexit-to-cost-gbp1-200-for-each-person-in-uk":"/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md","so-you-got-new-engagement-tools-now-what":"/src/content/blog/so-you-got-new-engagement-tools-now-what.md","dont-shut-out-your-community-guide-them-to-civility":"/src/content/blog/dont-shut-out-your-community-guide-them-to-civility.md","the-microbrewery-scene-in-toronto-is-exploding":"/src/content/blog/the-microbrewery-scene-in-toronto-is-exploding.md","golden-globes-2024":"/src/content/blog/golden-globes-2024.md","here-are-what-media-companies-are-doing-with-covid-19-overload":"/src/content/blog/here-are-what-media-companies-are-doing-with-covid-19-overload.md","korean-fusion-delight-homemade-bulgogi-tacos-recipe":"/src/content/blog/korean-fusion-delight-homemade-bulgogi-tacos-recipe.md","viafoura-fc-live-qa":"/src/content/blog/viafoura-fc-live-qa.md","vf-rams-gameday-follow-the-action-live":"/src/content/blog/vf-rams-gameday-follow-the-action-live.md"}}};

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
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-10 h-16 max-w-full bg-neutral-800 px-4 py-3 dark:bg-[#090909]"> <div class="mx-auto flex max-w-6xl items-center"> <div class="h-8 w-8"> <button title="Open Menu"> <svg class="h-8 w-8" stroke="#fff" fill="#fff" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z"></path></svg> </button> </div> <div class="mx-auto h-[30px] w-[150px]"> <a href="/" title="Viafoura"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="viafoura-white-logo" width="150" height="30" viewBox="0 0 1920 383.6" style="enable-background:new 0 0 1920 383.6;" xml:space="preserve"> <style type="text/css">
            .st0 {
              fill: #ffffff;
            }
          </style> <g> <path class="st0" d="M309.6,116.9c0,1.1-0.2,2.1-0.7,2.9c0,0-0.2,0.4-0.3,0.6c0,0-15.8,27.7-16,28l0,0c-1.2,1.8-3.2,3-5.6,3 c-2.7,0-5.1-1.7-6.1-4l-15-27.1v0c-0.6-1-0.9-2.1-0.9-3.3c0-3.7,3-6.7,6.7-6.7h31.2C306.6,110.2,309.6,113.2,309.6,116.9 M240.2,113.9l33.9,59.4v0c0.6,1,0.9,2.1,0.9,3.3c0,1.2-0.3,2.3-0.9,3.3L244.4,231c0,0,0,0,0,0l-0.2,0.3c-1.2,1.9-3.3,3.1-5.7,3.1 c-2.9,0-5.4-1.8-6.3-4.4l-62.8-109.9c-0.6-1-0.9-2.1-0.9-3.3c0-3.7,3-6.7,6.7-6.7h58.9C236.9,110.2,239.1,111.7,240.2,113.9 M144.1,113.5l82.1,142.8c0.6,1,0.9,2.1,0.9,3.3c0,1.2-0.3,2.4-0.9,3.4l-29.7,51.2c-1.2,1.9-3.3,3.2-5.7,3.2 c-2.4,0-4.5-1.3-5.7-3.2l-0.2-0.3c0,0,0-0.1,0-0.1L73.6,120.3c-0.6-1-0.9-2.2-0.9-3.4c0-3.7,3-6.7,6.7-6.7h59l0,0 C140.8,110.2,142.9,111.6,144.1,113.5 M383.6,191.8C383.6,85.9,297.7,0,191.8,0S0,85.9,0,191.8s85.9,191.8,191.8,191.8 S383.6,297.7,383.6,191.8"></path> <polygon class="st0" points="561.1,317.2 484.9,109.5 543.3,109.5 583.3,244.5 583.8,247.5 591.8,247.5 592.2,244.5 631.3,109.5 688.7,109.5 611,317.2"></polygon> <polygon class="st0" points="784.7,317.2 784.7,109.5 731.2,109.5 708.1,149 739.2,149 734.2,171.8 734.2,317.2"></polygon> <path class="st0" d="M941.5,277.7l-4.9,1c-7.4,2-13.9,2.5-19.8,2.5c-3.5,0-7.4,0-11.9-0.5c-5.4-0.5-10.4-2-14.8-3.5 c-5-1.5-9.4-4.9-12.9-8.9c-4-4.5-5.4-10.4-5.4-17.8c0-11.9,5.4-20.3,14.8-25.2c8.4-3.5,19.3-5.9,32.2-5.9c2.5,0,4.9,0,8.4,0.5 c3.5,0,5.9,0.5,9.4,1l4.9,1V277.7z M992.9,307.8V189.6c0-28.7-6.9-50-21.8-62.8c-14.8-12.9-36.1-19.8-64.3-19.8 c-9.9,0-20.8,0.5-33.1,3c-10.8,2.5-21.1,4.4-32.9,8.3l10.7,36.9c7-1.9,13.6-3.7,20.2-4.7c8.9-2,16.8-2.5,23.7-2.5 c12.9,0,23.7,2,32.2,5.4c6.9,3,15.3,10.4,15.8,27.7v7.4l-6.9-1c-4.9,0-9.4-0.5-12.9-0.5h-8.9c-11.4,0-22.3,1-33.1,3.5 c-10.9,2.5-20.3,5.9-28.7,10.9c-8.4,4.5-15.3,11.4-20.3,19.8c-4.9,7.4-7.9,18.3-7.9,30.7c0,12.9,2,23.7,5.9,32.2 c4,8.4,9.9,15.8,17.3,20.8c7.9,5.9,17.3,9.4,28.7,11.9c11.9,3,24.7,4,38.6,4c15.8,0,31.2-1.5,45-5.4 C972.7,312.8,981.6,310.8,992.9,307.8"></path> <path class="st0" d="M1145.3,64.9L1165,31c-5.4-1.4-10.1-3.2-14.3-3.7c-6.4-1-12.9-1.5-20.3-1.5c-24.2,0-44,6.9-57.9,20.8 c0,0-12.4,10.4-16.8,21.3c-4,8.9-7.4,15.8-7.4,28.2v13.4h-28.2V149h28.2v168.2h51V168.3v-19.8h29.9l22.7-39.1h-52.7V96.1 c0-10.9,5.4-19.3,12.9-24.2c5.9-4.5,15.8-6.9,26.7-6.9H1145.3z"></path> <path class="st0" d="M1254.1,149c-14.8,0-26.2,4.9-35.1,15.8c-8.4,9.9-12.9,26.2-12.9,49c0,23.7,4,39.1,12.9,49.5 c8.4,9.9,20.8,15.3,35.1,15.3c14.8,0,26.2-4.9,35.1-15.3c8.4-9.9,12.4-25.7,12.4-49.5s-4-39.1-12.4-49.5 C1280.4,154,1268.5,149,1254.1,149 M1254.1,319.7c-13.9,0-27.7-1.5-39.1-5.4c-11.4-4-21.3-9.4-29.7-17.8 c-8.4-8.4-15.3-19.3-19.8-32.7c-4.9-13.4-7.4-30.2-7.4-49.5c0-19.3,2.5-35.1,7.4-49c5-13.4,11.9-24.2,20.3-32.7 c8.4-8.4,18.3-14.8,29.7-18.3c11.9-4,24.7-5.9,38.6-5.9s26.7,1.5,38.6,5.4c11.9,4,21.8,9.4,29.7,17.8c8.4,8.4,15.3,19.3,19.8,32.7 c4.9,13.4,7.4,30.2,7.4,49.5c0,19.8-2.5,36.1-7.4,49.5c-4.9,13.4-11.9,24.2-19.8,32.7c-8.4,8.4-18.3,13.9-29.7,17.8 C1280.9,317.7,1267.5,319.7,1254.1,319.7"></path> <path class="st0" d="M1484.7,319.7c-13.9,0-27.7-1-40.1-3.5c-11.9-2.5-22.3-6.9-31.7-12.9c-8.9-6.9-17.8-16.3-23.3-29.2 c-5.4-12.9-9.9-30.7-9.9-53.9V109.5h50.5v108.8c0,10.9,3,19.3,4.5,26.2c1.5,7.9,5.9,13.9,9.9,18.3c4,4.5,9.9,7.9,16.3,9.9 c5.4,1.5,12.4,3,19.8,3c8.4,0,16.3-0.5,23.3-1l5.4-1l-0.5-12.4V109.5h50.5v197.9c-11.4,3-19.8,5.4-31.7,7.9 C1513.9,317.7,1499,319.7,1484.7,319.7"></path> <path class="st0" d="M1739.4,150.5v-42h-0.5c-4-0.5-9.4-0.5-15.3-0.5c-6.4,0-12.4,2-17.8,3c-13.9,3-33.6,23.3-33.6,23.3V110h-57.5 l-21.3,36.6l-1.3,2.5h29.2v168.2h50.5V211.4c0-12.9,1-22.8,4-30.2c3-8.4,7.9-14.8,14.8-19.8c5.4-4,11.4-6.4,18.3-7.9 c5.4-1.5,11.9-2.5,17.3-3h0.5h6.9H1739.4z"></path> <path class="st0" d="M1868.6,277.7l-4.9,1c-7.4,2-13.9,2.5-19.8,2.5c-3.5,0-7.4,0-11.9-0.5c-5.4-0.5-10.4-2-14.8-3.5 c-5-1.5-9.4-4.9-12.9-8.9c-4-4.5-5.4-10.4-5.4-17.8c0-11.9,5.4-20.3,14.8-25.2c8.4-3.5,19.3-5.9,32.2-5.9c2.5,0,4.9,0,8.4,0.5 c3.5,0,5.9,0.5,9.4,1l4.9,1V277.7z M1920,307.8V189.6c0-28.7-6.9-50-21.8-62.8c-14.8-12.9-36.1-19.8-64.3-19.8 c-9.9,0-20.8,0.5-33.1,3c-10.8,2.5-21.1,4.4-32.9,8.3l10.7,36.9c7-1.9,13.6-3.7,20.2-4.7c8.9-2,16.8-2.5,23.7-2.5 c12.9,0,23.7,2,32.2,5.4c6.9,3,15.3,10.4,15.8,27.7v7.4l-6.9-1c-4.9,0-9.4-0.5-12.9-0.5h-8.9c-11.4,0-22.3,1-33.1,3.5 c-10.9,2.5-20.3,5.9-28.7,10.9c-8.4,4.5-15.3,11.4-20.3,19.8c-4.9,7.4-7.9,18.3-7.9,30.7c0,12.9,2,23.7,5.9,32.2 c4,8.4,9.9,15.8,17.3,20.8c7.9,5.9,17.3,9.4,28.7,11.9c11.9,3,24.7,4,38.6,4c15.8,0,31.2-1.5,45-5.4 C1899.7,312.8,1908.6,310.8,1920,307.8"></path> </g> </svg> </a> </div> <div class="h-10 w-10 rounded-full bg-neutral-700 hover:bg-neutral-600"> <div class="viafoura">${renderComponent($$result, "vf-tray-trigger", "vf-tray-trigger", {})}</div> </div> </div> </header>`;
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
