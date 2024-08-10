/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, d as renderComponent, b as createAstro } from '../chunks/astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import { TwicImg } from '@twicpics/components/react';
import { g as getCollection, $ as $$MainLayout } from '../chunks/MainLayout_h9jYmYvY.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$VfConversationsCount = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VfConversationsCount;
  const { slug, vfContainerId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="mr-3 flex hover:underline"${addAttribute(`/posts/${slug}#vf-conversations-container`, "href")} title="Join the Conversation"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="mx-1 mt-[3px] h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"> <path d="M7 7h10v2H7zm0 4h7v2H7z"></path> <path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path> </svg> <div class="viafoura"> ${renderComponent($$result, "vf-conversations-count", "vf-conversations-count", { "vf-container-id": vfContainerId })} </div> </a>`;
}, "/Users/santiago/Code/astro/astro-blog/src/components/VfConversationsCount.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("blog");
  const heroSlug = "here-are-what-media-companies-are-doing-with-covid-19-overload";
  const postHero = posts.find((post) => post.slug === heroSlug);
  const postList = posts.filter((post) => post.slug !== heroSlug);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Viafoura Demo" }, { "default": ($$result2) => renderTemplate`${postHero && renderTemplate`${maybeRenderHead()}<article> <a${addAttribute(`posts/${postHero.slug}`, "href")}> <div class="mb-5 shadow-2xl"> ${renderComponent($$result2, "TwicImg", TwicImg, { "eager": true, "client:load": true, "src": postHero.data.image, "alt": postHero.data.title, "ratio": "16/9", "client:component-hydration": "load", "client:component-path": "@twicpics/components/react", "client:component-export": "TwicImg" })} </div> </a> <div class="grid gap-x-6 sm:grid-cols-2"> <h1> <a${addAttribute(`posts/${postHero.slug}`, "href")} class="hover:underline"> ${postHero.data.title} </a> </h1> <div> <p class="mb-4 mt-4 text-base text-gray-700 antialiased sm:mt-0"> ${postHero.data.excerpt} </p> <div class="w-50 flex text-base font-semibold text-gray-800"> ${postHero.data.author} ${postHero.body.includes("vf-conversations") && renderTemplate`${renderComponent($$result2, "VfConversationsCount", $$VfConversationsCount, { "slug": postHero.slug, "vfContainerId": postHero.data.vfContainerId })}`} </div> </div> </div> </article>`}<section class="pb-6 pt-11"> <h2 class="mb-6 flex items-center">More Stories</h2> <div class="grid gap-x-16 gap-y-10 sm:grid-cols-2"> ${postList.map((post) => renderTemplate`<article> <a${addAttribute(`/posts/${post.slug}`, "href")}> <div class="mb-5 shadow-2xl"> ${renderComponent($$result2, "TwicImg", TwicImg, { "client:load": true, "src": post.data.image, "alt": post.data.title, "ratio": "16/9", "client:component-hydration": "load", "client:component-path": "@twicpics/components/react", "client:component-export": "TwicImg" })} </div> </a> <h3 class="mb-3"> <a${addAttribute(`/posts/${post.slug}`, "href")} class="hover:underline"> ${post.data.title} </a> </h3> <p class="mb-4 text-base text-gray-700 antialiased">${post.data.excerpt}</p> <div class="w-50"> <div class="flex text-base font-semibold text-gray-800"> ${post.data.author} ${post.body.includes("vf-conversations") && renderTemplate`${renderComponent($$result2, "VfConversationsCount", $$VfConversationsCount, { "slug": post.slug, "vfContainerId": post.data.vfContainerId })}`} </div> </div> </article>`)} </div> </section> ` })}`;
}, "/Users/santiago/Code/astro/astro-blog/src/pages/index.astro", void 0);

const $$file = "/Users/santiago/Code/astro/astro-blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
