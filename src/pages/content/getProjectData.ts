import findElementByText from "./utils/findElementByText";

function getRemainingTime(): number {
	const now = new Date();
	const projectMetadata = document.querySelector("#project-metadata");
	const checkerElement = findElementByText(projectMetadata, "li", "Checker");
	const timeString = (checkerElement?.querySelector(".datetime") as HTMLElement)?.innerText;
	const releaseTime = new Date(timeString);
	const remainingTimeInMs = releaseTime.getTime() - now.getTime();

	return remainingTimeInMs;
}

function isQuizAvailable(): boolean {
	// Check if a quiz is available on the page
	const quizContainer = document.querySelector(".quiz_questions_show_container");
	const quizButton = quizContainer?.querySelector(".quiz_questions_results button");

	return !!quizButton;
}

function isAdvancedTasksLocked(): boolean {
	// Check if a form to unlock advanced tasks is present on the page
	const unlockForm = document.querySelector("form.button_to[action$='/unlock_optionals']");

	return !!unlockForm;
}

function isCheckerBtnAvailable(): boolean {
	// Check if a checker button is present on the page
	const checkerBtn = document.querySelectorAll("button[id='task-num-0-check-code-btn']");

	return !!checkerBtn.length;
}

function getProjectData(
	sendResponse: (data: {
		remainingTimeInMs: number;
		quizAvailable: boolean;
		advancedTasksLocked: boolean;
		hasCheckerBtn: boolean;
	}) => void
): void {
	if (document.querySelector("#project-metadata")) {
		const remainingTimeInMs = getRemainingTime();
		const quizAvailable = isQuizAvailable();
		const advancedTasksLocked = isAdvancedTasksLocked();
		const hasCheckerBtn = isCheckerBtnAvailable();

		sendResponse({ remainingTimeInMs, quizAvailable, advancedTasksLocked, hasCheckerBtn });
	}
}

export default getProjectData;
