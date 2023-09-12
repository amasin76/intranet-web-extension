const unlockAdvancedTasks = (sendResponse) => {
	try {
		const unlockForm = document.querySelector("form.button_to[action$='/unlock_optionals']");

		(unlockForm?.querySelector("input[type='submit']") as HTMLElement).click();

		sendResponse({ success: true });
	} catch (err) {
		console.warn(err);
		sendResponse({ success: false });
	}
};

export default unlockAdvancedTasks;
