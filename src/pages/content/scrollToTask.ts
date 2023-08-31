import scrollToElement from "./utils/scrollToElement";

function scrollToTask(): void {
	let taskNum: string = "";

	// Listens for keydown events to capture task number input
	document.addEventListener("keydown", (event: KeyboardEvent): void => {
		if (event.keyCode >= 48 && event.keyCode <= 57) {
			if (event.shiftKey && taskNum.length < 2) {
				// Captures the second digit of the task number when shift key is held
				taskNum += String.fromCharCode(event.keyCode);
				if (taskNum.length === 2) scrollToElement("#task-num-" + taskNum);
			} else if (!event.shiftKey) {
				// Captures the first digit of the task number.
				taskNum = String.fromCharCode(event.keyCode);
				scrollToElement("#task-num-" + taskNum);
			}
		}
	});

	// Resets taskNum when shift key or number key is released
	document.addEventListener("keyup", (event: KeyboardEvent): void => {
		// Resets taskNum when shift key is released
		if (event.keyCode === 16) taskNum = "";
		// Resets taskNum when number key is released without shift
		if (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) taskNum = "";
	});
}

export default scrollToTask;
