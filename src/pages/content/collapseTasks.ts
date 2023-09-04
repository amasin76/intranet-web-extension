const collapseButtonStyles = {
	position: "absolute",
	right: "13%",
	"font-size": "1.25rem",
	outline: "none",
	opacity: "0.4",
};

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
			// get the panel-body and list-group elements for this task card
			const panelBody: HTMLElement = taskCard.querySelector(".panel-body");
			const listGroup: HTMLElement = taskCard.querySelector(".list-group");

			// get the computed styles for the panel-body and list-group elements
			const panelBodyStyle = window.getComputedStyle(panelBody);
			const listGroupStyle = window.getComputedStyle(listGroup);

			// toggle the display property of the panel-body and list-group elements
			panelBody.style.display = panelBodyStyle.display === "none" ? "block" : "none";
			listGroup.style.display = listGroupStyle.display === "none" ? "block" : "none";
		});

		// get the panel-heading element for this task card
		const panelHeading: HTMLElement = taskCard.querySelector(".panel-heading");

		// add styles to the parent of the collapse button
		panelHeading.style.position = "relative";

		// insert the collapse button as the second child of the panel-heading element
		panelHeading.insertBefore(collapseButton, panelHeading.children[1]);
	});
};

const toggleCollapseTasks = (collapseSuccess: boolean, collapseFail: boolean) => {
	// create a new style element
	const style = document.createElement("style");
	style.id = "collapse-style";

	// set the text content of the style element based on the collapseSuccess and collapseFail parameters
	if (collapseSuccess) {
		style.textContent += `
		:has(.student_task_done.yes) > .panel-body,
		:has(.student_task_done.yes) > .list-group 
		{ display: none; }`;
	}
	if (collapseFail) {
		style.textContent += `
		:has(.student_task_done.no) > .panel-body,
		:has(.student_task_done.no) > .list-group 
		{ display: none; }`;
	}

	// get the existing style element with the same ID, if it exists
	const existingStyle = document.getElementById("collapse-style");

	// if the existing style element exists, replace it with the new one
	if (existingStyle) {
		existingStyle.replaceWith(style);
	} else {
		// otherwise, append the new style element to the head of the page
		document.head.appendChild(style);
	}
};

export { toggleCollapseTasks, setBtnCollapseTask };
