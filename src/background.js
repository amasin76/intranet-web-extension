chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.url) {
		if (changeInfo.url.startsWith('https://intranet.alxswe.com/projects/')) {
			chrome.browserAction.enable(tabId);
		} else {
			chrome.browserAction.disable(tabId);
		}
	}
});

