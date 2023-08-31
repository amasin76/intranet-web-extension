const checkerRunning = (request, observers, sendResponse) => {
	let spinners = document.querySelectorAll(".task_correction_modal .spinner");
	const tasksToRun = request.tasksToRun;

	// Iterate through each spinner element
	spinners.forEach(function (spinner: HTMLElement, index) {
		// Get the task ID associated with the spinner
		let taskId = spinner.parentElement
			.querySelector(".correction_request_test_send")
			.getAttribute("data-task-id");

		// Check if the task is not in the list of tasks to run or if an observer already exists
		if (!tasksToRun.includes(taskId) || observers[taskId]) return;
		console.log(index);

		// Create a MutationObserver to watch for changes in the spinner's attributes
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				// Check if the style attribute changed
				if (mutation.attributeName === "style") {
					const displayValue = spinner.style.display;

					// If the spinner is hidden, task checker is considered done
					if (displayValue === "none") {
						setTimeout(function () {
							// Find the element indicating task completion
							const studentTaskDoneElement = document.querySelector(
								`.student_task_done[data-task-id="${taskId}"]`
							);
							// Determine task status based on the presence of 'yes' class
							const taskStatus = studentTaskDoneElement.classList.contains("yes") ? "yes" : "no";

							// Send a message to the popup indicating task completion
							chrome.runtime.sendMessage({
								message: "task_finished",
								taskId: taskId,
								taskStatus: taskStatus,
							});
						}, 1500); // Wait for 1 before start read task status from .studentTaskDoneElement
					}
				}
			});
		});

		// Start observing the spinner element for attribute changes
		observer.observe(spinner, { attributes: true });
		// Store the observer for the task ID to avoid creating duplicate observers
		observers[taskId] = observer;
	});

	sendResponse({ success: true });
};

export default checkerRunning;
