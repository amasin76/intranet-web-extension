browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url) {
	  if (changeInfo.url.startsWith('https://intranet.alxswe.com/projects/')) {
		browser.browserAction.enable(tabId);
	  } else {
		browser.browserAction.disable(tabId);
	  }
	}
});
