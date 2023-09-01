import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

function injectContentScript() {
	chrome.tabs.query({ url: "https://intranet.alxswe.com/*" }, function (tabs) {
		tabs.forEach(function (tab) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["src/pages/content/index.js"],
			});
		});
	});
}

// Inject the content-script when the extension is installed or enabled
// This ensures that the extension works without the user having to refresh the webpage
chrome.runtime.onInstalled.addListener(injectContentScript);
chrome.runtime.onStartup.addListener(injectContentScript);
