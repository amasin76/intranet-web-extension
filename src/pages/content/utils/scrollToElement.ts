// Scrolls to the specified element identified by the selector.
const scrollToElement = (selector: string) => {
	let task: Element | null = document.querySelector(selector);
	if (task) task.scrollIntoView();
};

export default scrollToElement;
