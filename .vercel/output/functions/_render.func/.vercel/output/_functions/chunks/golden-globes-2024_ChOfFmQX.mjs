import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Follow our live coverage for awards for film and American television productions of 2023.</p>\n<div class=\"viafoura\">\n  <vf-live-blog></vf-live-blog>\n</div>";

				const frontmatter = {"vfContainerId":101113521,"title":"Golden Globes 2024","image":"golden-globes.webp","author":"Tom Hardington","topics":["News"],"excerpt":"Follow our live coverage for awards for film and American television productions of 2023.","pubDate":"Jan 26 2022","productDemo":"Live Blog - News","showLiveChat":true};
				const file = "/Users/santiago/Code/astro/astro-blog/src/content/blog/golden-globes-2024.md";
				const url = undefined;
				function rawContent() {
					return "\nFollow our live coverage for awards for film and American television productions of 2023.\n\n<div class=\"viafoura\">\n  <vf-live-blog></vf-live-blog>\n</div>\n";
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
