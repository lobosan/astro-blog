import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Viafoura’s Travel Correspondent Lindsay Singleton takes any and all travel related questions. Whether it’s questions about travelling during and after the pandemic, top places to visit on a budget or anything else travel related, Lindsay is waiting to answer.</p>\n<p>Simply post a message in the Conversations area below and Lindsday will reply to you asap. Please try to keep the questions specific to all things travel.</p>\n<div class=\"viafoura\" id=\"vf-conversations-container\">\n  <vf-conversations></vf-conversations>\n</div>";

				const frontmatter = {"vfContainerId":100014,"title":"Ask me Anything: Viafoura's Travel Correspondent answers your questions live","image":"ask-me-anything-vf-travel.jpg","author":"Lindsay Singleton","topics":["Travel"],"excerpt":"Viafoura's Travel Correspondent Lindsay Singleton takes any and all travel related questions. Join the conversation now!","pubDate":"Apr 09 2023","productDemo":"Conversations - Ask Me Anything","showLiveChat":false};
				const file = "/Users/santiago/Code/astro/astro-blog/src/content/blog/ask-me-anything-viafouras-travel-correspondent-answers-your-questions-live.md";
				const url = undefined;
				function rawContent() {
					return "\nViafoura's Travel Correspondent Lindsay Singleton takes any and all travel related questions. Whether it's questions about travelling during and after the pandemic, top places to visit on a budget or anything else travel related, Lindsay is waiting to answer.\n\nSimply post a message in the Conversations area below and Lindsday will reply to you asap. Please try to keep the questions specific to all things travel.\n\n<div class=\"viafoura\" id=\"vf-conversations-container\">\n  <vf-conversations></vf-conversations>\n</div>\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
