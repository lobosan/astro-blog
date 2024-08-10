import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DVnfWoNJ.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Viafoura FC manager Mick Lozar is online and taking questions from fans about the team and their trials and tribulations throughout the season. Join the chat live below and Mick will do his best to answer any and all questions that are thrown his way.</p>\n<h2 id=\"join-the-live-chat\">Join the Live Chat</h2>\n<div class=\"viafoura\" id=\"livechat-wrapper\" style=\"height: 550px;\">\n  <vf-livechat></vf-livechat>\n</div>\n<p>We will be planning to have a lot more of these Live Q&#x26;A sessions with various members of our team and front-office. Have someone in mind that you would like to see featured in a future session, <strong>please let us know!</strong></p>";

				const frontmatter = {"vfContainerId":101113526,"title":"Viafoura FC: Live Q&A","image":"viafoura-fc-live-qa.jpg","author":"Norman Phillips","topics":["Sports"],"excerpt":"Viafoura FC manager Mick Lozar is online and taking questions from fans about the team and their trials and tribulations throughout the season. Join now!","pubDate":"Feb 28 2022","productDemo":"Live Chat - Sports Q&A","showLiveChat":false};
				const file = "/Users/santiago/Code/astro/astro-blog/src/content/blog/viafoura-fc-live-qa.md";
				const url = undefined;
				function rawContent() {
					return "\nViafoura FC manager Mick Lozar is online and taking questions from fans about the team and their trials and tribulations throughout the season. Join the chat live below and Mick will do his best to answer any and all questions that are thrown his way.\n\n## Join the Live Chat\n\n<div class=\"viafoura\" id=\"livechat-wrapper\" style=\"height: 550px;\">\n  <vf-livechat></vf-livechat>\n</div>\n\nWe will be planning to have a lot more of these Live Q&A sessions with various members of our team and front-office. Have someone in mind that you would like to see featured in a future session, **please let us know!**\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"join-the-live-chat","text":"Join the Live Chat"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
