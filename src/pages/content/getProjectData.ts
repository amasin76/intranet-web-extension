import findElementByText from "./utils/findElementByText";

function getRemainingTime(): number {
	const now = new Date();
	const projectMetadata = document.querySelector("#project-metadata");
	const checkerElement = findElementByText(projectMetadata, "li", "Checker");
	const timeString = (checkerElement.querySelector(".datetime") as HTMLElement).innerText;
	const releaseTime = new Date(timeString);
	const remainingTimeInMs = releaseTime.getTime() - now.getTime();

	return remainingTimeInMs;
}

function isQuizAvailable(): boolean {
	// Check if a quiz is available on the page
	const quizContainer = document.querySelector(".quiz_questions_show_container");

	if (quizContainer) {
		const quizButton = quizContainer.querySelector(".quiz_questions_results button");
		return !!quizButton;
	}
	return false;
}

function getProjectData(
	sendResponse: (data: { remainingTimeInMs: number; quizAvailable: boolean }) => void
): void {
	if (document.querySelector("#project-metadata")) {
		const remainingTimeInMs = getRemainingTime();
		const quizAvailable = isQuizAvailable();

		sendResponse({ remainingTimeInMs, quizAvailable });
	}
}

export default getProjectData;
