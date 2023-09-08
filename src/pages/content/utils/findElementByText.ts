const findElementByText = (element: Element, tagName: string, text: string): Element | undefined =>
	Array.from(element.querySelectorAll(tagName)).find((element: Element) =>
		element.textContent?.includes(text)
	);

export default findElementByText;
