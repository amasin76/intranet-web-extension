import packageJson from "./package.json";

const manifest: chrome.runtime.ManifestV3 = {
	manifest_version: 3,
	name: "ALX Intranet",
	version: packageJson.version,
	description: packageJson.description,
	permissions: ["storage", "scripting"],
	host_permissions: ["https://intranet.alxswe.com/*"],
	options_page: "src/pages/options/index.html",
	background: {
		service_worker: "src/pages/background/index.js",
		type: "module",
	},
	action: {
		default_popup: "src/pages/popup/index.html",
		default_icon: "icon-32.png",
	},
	icons: {
		"128": "icon-128.png",
	},
	content_scripts: [
		{
			matches: ["https://intranet.alxswe.com/*"],
			js: ["src/pages/content/index.js"],
			run_at: "document_end",
			// KEY for cache invalidation
			css: ["assets/css/contentStyle<KEY>.chunk.css"],
		},
	],
	web_accessible_resources: [
		{
			resources: ["assets/js/*.js", "assets/css/*.css", "icon-128.png", "icon-34.png"],
			matches: ["https://intranet.alxswe.com/*"],
		},
	],
};

export default manifest;
