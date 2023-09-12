import findElementByText from "./utils/findElementByText";

function getRemainingTime(checkerElement: Element): number {
	const now = new Date();

	const timeString = (checkerElement.querySelector(".datetime") as HTMLElement).innerText;

	const releaseTime = new Date(timeString);

	const remainingTimeInMs = releaseTime.getTime() - now.getTime();

	return remainingTimeInMs;
}

function getProjectData(sendResponse: (data: { remainingTimeInMs: number }) => void): void {
	const projectMetadata = document.querySelector("#project-metadata");

	if (projectMetadata) {
		const checkerElement = findElementByText(projectMetadata, "li", "Checker");

		if (checkerElement) {
			const remainingTimeInMs = getRemainingTime(checkerElement);
			sendResponse({ remainingTimeInMs });
		}
	}
}

export default getProjectData;
