import getProjectData from "./getProjectData";
import getTaskData from "./getTaskData";
import easyQuiz from "./easyQuiz";
import runCheckedTasks from "./runCheckedTasks";
import scrollToTask from "./scrollToTask";
import copyCmdFiles from "./scrapeFilesNames";
import checkerRunning from "./checkerRunning";
import unlockAdvancedTasks from "./unlockAdvancedTasks";
import { LocalStorage } from "@src/shared/storages/localStorage";
import { setBtnCollapseTask, toggleCollapseTasks } from "./collapseTasks";
import refreshPage from "./refreshPage";

// Quizz Button Floating
easyQuiz();
// Hotkeys
scrollToTask();
// set collapse button for each task
setBtnCollapseTask();

// Auto collapse tasks based user prefrenaces
const localStorage = new LocalStorage();

interface CollapseState {
	collapseSuccess: boolean;
	collapseFail: boolean;
}

(async () => {
	try {
		const collapseState = await localStorage.load<CollapseState>("collapse-storage-key");
		const { collapseSuccess, collapseFail } = collapseState;
		toggleCollapseTasks(collapseSuccess, collapseFail);
		// eslint-disable-next-line no-empty
	} catch (err) {}
})();

// set userstyle (custom css) if available
const customCssStorage = new LocalStorage();

(async () => {
	try {
		const data: { customCss: string } = await customCssStorage.load("custom-css-key");
		const customCss = data.customCss;
		console.log(customCss);
		if (customCss) {
			const styleElement = document.createElement("style");
			styleElement.textContent = customCss;
			styleElement.id = "user-style";
			document.head.append(styleElement);
		}
	} catch (err) {
		customCssStorage.save("custom-css-key", "");
		console.error(err);
	}
})();

const observers = {};
// TODO: add handler for messages to avoid if/else
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "refresh-page") {
		refreshPage(sendResponse);
	} else if (request.message === "get-project-data") {
		getProjectData(sendResponse);
	} else if (request.message === "get-task-status") {
		getTaskData(sendResponse);
	} else if (request.message === "unlock-advanced-tasks") {
		unlockAdvancedTasks(sendResponse);
	} else if (request.message === "run-checker") {
		runCheckedTasks(request, sendResponse);
	} else if (request.message === "scrape-file-names") {
		copyCmdFiles(sendResponse);
	} else if (request.message === "create-observers") {
		checkerRunning(request, observers, sendResponse);
	} else if (request.message === "collapse-tasks") {
		const { collapseSuccess, collapseFail } = request;
		toggleCollapseTasks(collapseSuccess, collapseFail);
		sendResponse({ success: true });
	}
});
