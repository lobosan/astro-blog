import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Boris Johnson’s Brexit will hinder monetary development to the tune of £1,200 for each individual in the nation, the administration’s spending guard dog has said.</p>\n<p>” Brexit ” showed up only twice in Chancellor Rishi Sunak’s first Budget discourse in spite of the enormous effect it’s anticipated to have on the national accounts.</p>\n<p>The Office for Budget Responsibility (OBR) said dependent on current Brexit plans, development would be eased back by around 4% over the long haul.</p>\n<div class=\"viafoura\">\n  <vf-conversation-starter target=\"vf-conversations-container\"></vf-conversation-starter>\n</div>\n<p>They said some portion of the log jam was a consequence of lower relocation – yet most was from a slump in business speculation.</p>\n<p>The OBR’s view reflects lower net immigration, and also weak productivity growth, a long-running U.K. problem that’s been exacerbated by near-stagnant investment since the referendum in 2016. It said the economic effects of the decision to leave the EU have already reduced potential output by about 2%.</p>\n<div class=\"viafoura\">\n  <vf-content-recirculation title=\"Trending Conversations\" limit=\"5\" days-published=\"1\" trend-window=\"1\" sort=\"comments\"></vf-content-recirculation>\n</div>\n<p>“Real business investment has barely grown since the referendum, whereas our March 2016 forecast assumed it would have risen more than 20% by now,” the OBR said. While investment may rebound once there’s more Brexit clarity, higher trade barriers will continue to weigh on the economy’s capacity to grow.</p>\n<p>Bank of England Governor Mark Carney has referred to this as the economy’s “speed limit,” which he says has fallen in recent years. The BOE is even more gloomy on potential growth, partly because of a downbeat view of productivity.</p>\n<div class=\"viafoura\" id=\"vf-conversations-container\">\n  <vf-conversations></vf-conversations>\n</div>";

				const frontmatter = {"vfContainerId":300014,"title":"Brexit to cost £1,200 for each person in UK","image":"brexit-cost-in-uk.jpg","author":"Tom Hardington","topics":["Politics","News"],"excerpt":"Boris Johnson’s Brexit will hinder monetary development to the tune of £1,200 for each individual in the nation, the administration’s spending guard dog has said.","pubDate":"Mar 06 2022","showLiveChat":false};
				const file = "/Users/santiago/Code/astro/astro-blog/src/content/blog/brexit-to-cost-gbp1-200-for-each-person-in-uk.md";
				const url = undefined;
				function rawContent() {
					return "\nBoris Johnson’s Brexit will hinder monetary development to the tune of £1,200 for each individual in the nation, the administration’s spending guard dog has said.\n\n” Brexit ” showed up only twice in Chancellor Rishi Sunak’s first Budget discourse in spite of the enormous effect it’s anticipated to have on the national accounts.\n\nThe Office for Budget Responsibility (OBR) said dependent on current Brexit plans, development would be eased back by around 4% over the long haul.\n\n<div class=\"viafoura\">\n  <vf-conversation-starter target=\"vf-conversations-container\"></vf-conversation-starter>\n</div>\n\nThey said some portion of the log jam was a consequence of lower relocation – yet most was from a slump in business speculation.\n\nThe OBR’s view reflects lower net immigration, and also weak productivity growth, a long-running U.K. problem that’s been exacerbated by near-stagnant investment since the referendum in 2016. It said the economic effects of the decision to leave the EU have already reduced potential output by about 2%.\n\n<div class=\"viafoura\">\n  <vf-content-recirculation title=\"Trending Conversations\" limit=\"5\" days-published=\"1\" trend-window=\"1\" sort=\"comments\"></vf-content-recirculation>\n</div>\n\n“Real business investment has barely grown since the referendum, whereas our March 2016 forecast assumed it would have risen more than 20% by now,” the OBR said. While investment may rebound once there’s more Brexit clarity, higher trade barriers will continue to weigh on the economy’s capacity to grow.\n\nBank of England Governor Mark Carney has referred to this as the economy’s “speed limit,” which he says has fallen in recent years. The BOE is even more gloomy on potential growth, partly because of a downbeat view of productivity.\n\n<div class=\"viafoura\" id=\"vf-conversations-container\">\n  <vf-conversations></vf-conversations>\n</div>\n";
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
