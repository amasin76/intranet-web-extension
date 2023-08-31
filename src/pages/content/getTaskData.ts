function getTaskData(sendResponse) {
	const buttons = document.querySelectorAll(".student_task_done");
	const taskStatus: string[] = [];
	const taskIds: string[] = [];

	buttons.forEach((button) => {
		if (button.classList.contains("yes")) {
			taskStatus.push("yes");
		} else if (button.classList.contains("no")) {
			taskStatus.push("no");
		} else {
			taskStatus.push("default");
		}
		taskIds.push(button.getAttribute("data-task-id")!);
	});

	sendResponse({ taskStatus, taskIds });
}

export default getTaskData;
