function getTaskData(sendResponse) {
	const buttons = document.querySelectorAll(".student_task_done");
	const taskStatus: string[] = [];
	const taskIds: string[] = [];
	const hasChecker: boolean[] = [];

	buttons.forEach((button) => {
		const taskId = button.getAttribute("data-task-id")!;
		taskIds.push(taskId);

		if (button.classList.contains("yes")) {
			taskStatus.push("yes");
		} else if (button.classList.contains("no")) {
			taskStatus.push("no");
		} else {
			taskStatus.push("default");
		}

		const checkerButton = document.querySelector(`.check-your-task-${taskId}-modal-button`);
		hasChecker.push(checkerButton !== null);
	});

	sendResponse({ taskStatus, taskIds, hasChecker });
}

export default getTaskData;
