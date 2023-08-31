const collapseButtonStyles = {
	position: "absolute",
	right: "13%",
	"font-size": "1.25rem",
	outline: "none",
	opacity: "0.4",
};

// const setBtnCollapseTask = (): void => {
// 	// get all task cards
// 	const taskCards = document.querySelectorAll('[data-role^="task"]');

// 	// iterate over each task card
// 	taskCards.forEach((taskCard) => {
// 		// create a new button element
// 		const collapseButton = document.createElement("button");
// 		collapseButton.innerText = "Collapse";
// 		collapseButton.className = "collapse-button btn close";

// 		// add styles to the collapse button
// 		Object.assign(collapseButton.style, collapseButtonStyles);

// 		// add an event listener to the button to handle clicks
// 		collapseButton.addEventListener("click", () => {
// 			// get the panel-body and list-group elements for this task card
// 			const panelBody: HTMLElement = taskCard.querySelector(".panel-body");
// 			const listGroup: HTMLElement = taskCard.querySelector(".list-group");

// 			// toggle the display property of the panel-body and list-group elements
// 			panelBody.style.display = panelBody.style.display === "none" ? "" : "none";
// 			listGroup.style.display = listGroup.style.display === "none" ? "" : "none";
// 		});

// 		// get the panel-heading element for this task card
// 		const panelHeading: HTMLElement = taskCard.querySelector(".panel-heading");

// 		// add styles to the parent of the collapse button
// 		panelHeading.style.position = "relative";

// 		// insert the collapse button as the second child of the panel-heading element
// 		panelHeading.insertBefore(collapseButton, panelHeading.children[1]);
// 	});
// };

const setBtnCollapseTask = (): void => {
	// get all task cards
	const taskCards = document.querySelectorAll('[data-role^="task"]');

	// iterate over each task card
	taskCards.forEach((taskCard) => {
		// create a new button element
		const collapseButton = document.createElement("button");
		collapseButton.innerText = "Collapse";
		collapseButton.className = "collapse-button btn close";

		// add styles to the collapse button
		Object.assign(collapseButton.style, collapseButtonStyles);

		// add an event listener to the button to handle clicks
		collapseButton.addEventListener("click", () => {
			// get the task ID for this task card
			const taskId = taskCard.getAttribute("data-role");

			// build a selector for this task card using its task ID
			const selector = `[data-role="${taskId}"]`;

			// toggle the visibility of this task card using the toggleCollapseTasks function
			toggleCollapseTasks(selector);
		});

		// get the panel-heading element for this task card
		const panelHeading: HTMLElement = taskCard.querySelector(".panel-heading");

		// add styles to the parent of the collapse button
		panelHeading.style.position = "relative";

		// insert the collapse button as the second child of the panel-heading element
		panelHeading.insertBefore(collapseButton, panelHeading.children[1]);
	});
};

const toggleCollapseTasks = (selector: string) => {
	// get all task cards that match the selector
	const taskCards = document.querySelectorAll(selector);

	// iterate over each task card
	taskCards.forEach((taskCard) => {
		// get the panel-body and list-group elements for this task card
		const panelBody: HTMLElement = taskCard.querySelector(".panel-body");
		const listGroup: HTMLElement = taskCard.querySelector(".list-group");

		// toggle the display property of the panel-body and list-group elements
		panelBody.style.display = panelBody.style.display === "none" ? "" : "none";
		listGroup.style.display = listGroup.style.display === "none" ? "" : "none";
	});
};

const collapseTasksSuccess = () => {
	toggleCollapseTasks('[data-role^="task"]:has(.student_task_done.yes)');
};

const collapseTasksFail = () => {
	toggleCollapseTasks('[data-role^="task"]:has(.student_task_done.no)');
};

export { collapseTasksFail, collapseTasksSuccess, setBtnCollapseTask };
