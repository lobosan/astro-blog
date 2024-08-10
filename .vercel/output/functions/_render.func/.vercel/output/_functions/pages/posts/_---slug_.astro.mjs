/* empty css                                    */
import { c as createComponent, r as renderTemplate, d as renderComponent, b as createAstro } from '../../chunks/astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import { $ as $$MainLayout, g as getCollection } from '../../chunks/MainLayout_CV4UO7HO.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const post = Astro2.props;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": post.data.title, "vfContainerId": post.data.vfContainerId.toString() }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Content", Content, {})} ` })}`;
}, "/Users/santiago/Code/astro/astro-blog/src/pages/posts/[...slug].astro", void 0);

const $$file = "/Users/santiago/Code/astro/astro-blog/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
