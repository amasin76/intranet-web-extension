const runCheckedTasks = (request, sendResponse) => {
	try {
		// Get the checked tasks from the request object
		let { tasksToRun } = request;
		console.log("tasksToRun", tasksToRun);
		// Select all the buttons with the "correction_request_test_send" class
		let buttons = document.querySelectorAll(".correction_request_test_send");
		// Iterate over each button
		buttons.forEach(function (button: HTMLElement) {
			// Check if the button's data-task-id attribute is included in the tasksToRun array
			if (tasksToRun.includes(button.getAttribute("data-task-id"))) {
				// run the task checker
				button.click();
			}
		});
		// Send a success response back to the popup
		sendResponse({ success: true });
	} catch (error) {
		// Send an error response back to the popup
		sendResponse({ success: false, error: error.message });
	}
};

export default runCheckedTasks;
