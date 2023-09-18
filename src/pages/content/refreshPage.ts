const refreshPage = (sendResponse) => {
	console.log("in refresh page content");
	window.location.reload();

	sendResponse({ success: true });
};

export default refreshPage;
