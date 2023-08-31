import getTaskData from "./getTaskData";
import runCheckedTasks from "./runCheckedTasks";
import scrollToTask from "./scrollToTask";
import copyCmdFiles from "./scrapeFilesNames";
import checkerRunning from "./checkerRunning";
import { setBtnCollapseTask, collapseTasksSuccess, collapseTasksFail } from "./collapseTasks";

// Hotkeys
scrollToTask();
// Create collapse tasks button
setBtnCollapseTask();

let observers = {};
// TODO: add handler for messages to avoid if/else
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "get-task-status") {
		getTaskData(sendResponse);
	} else if (request.message === "run-checker") {
		runCheckedTasks(request, sendResponse);
	} else if (request.message === "scrape-file-names") {
		copyCmdFiles(sendResponse);
	} else if (request.message === "create-observers") {
		checkerRunning(request, observers, sendResponse);
	} else if (request.message === "collapse-tasks-success") {
		collapseTasksSuccess();
		sendResponse({ success: true });
	} else if (request.message === "collapse-tasks-fail") {
		collapseTasksFail();
		sendResponse({ success: true });
	} else if (request.message === "collapse-tasks-all") {
		// FIX: oppisite state
		collapseTasksSuccess();
		collapseTasksFail();
		sendResponse({ success: true });
	}
});
