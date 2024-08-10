import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Another VF Tigers Gameday is upon us and we’re all hoping the Tigers can keep their miracle season going with another win against the 8-6 OW Officers. Our sports columnist Tom Hardington will be live blogging throughout the game, so follow along with him and all fans.</p>\n<div class=\"viafoura\">\n  <vf-live-blog></vf-live-blog>\n</div>";

				const frontmatter = {"vfContainerId":101113523,"title":"VF Rams vs OW Officers Gameday: Follow the Action Live!","image":"vf-rams-vs-ow-officers.jpg","author":"Tom Hardington","topics":["Sports"],"excerpt":"Another VF Tigers Gameday is upon us and we're all hoping the Tigers can keep their miracle season going with another win against the 8-6 OW Officers. Follow Live NOW!","pubDate":"Feb 15 2022","productDemo":"Live Blog - Gameday","showLiveChat":true};
				const file = "/Users/santiago/Code/astro/astro-blog/src/content/blog/vf-rams-gameday-follow-the-action-live.md";
				const url = undefined;
				function rawContent() {
					return "\nAnother VF Tigers Gameday is upon us and we're all hoping the Tigers can keep their miracle season going with another win against the 8-6 OW Officers. Our sports columnist Tom Hardington will be live blogging throughout the game, so follow along with him and all fans.\n\n<div class=\"viafoura\">\n  <vf-live-blog></vf-live-blog>\n</div>\n";
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
