import findElementByText from "./utils/findElementByText";

function scrapeFileNames(html: string): {
	dirName: string | undefined;
	fileNames: string[];
} {
	// Parse the HTML string into a DOM tree
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const fileNames: string[] = [];
	const taskCards = doc.querySelectorAll(".task-card");
	let dirName: string | undefined;

	// Loop through each task card
	for (let idx = 0; idx < taskCards.length; idx++) {
		const taskCard = taskCards[idx];
		const fileElement = findElementByText(taskCard, "li", "File:");
		const dirElement = findElementByText(taskCard, "li", "Directory:");
		dirName = dirElement?.querySelector("code")?.textContent;

		// If there is no dirElement, set dirName to the repository name
		if (!dirName) {
			const repoElement = findElementByText(taskCard, "li", "GitHub repository:");
			dirName = repoElement?.querySelector("code")?.textContent;
		}

		// Add available files names to the result array
		if (fileElement) {
			const fileText = fileElement.textContent.replace("File:", "").trim();
			const files = fileText.split(", ");
			files.forEach((file) => {
				fileNames.push(file.trim());
			});
		}
	}

	return { dirName, fileNames };
}

function generateCommandLine(dirName: string | undefined, fileNames: string[]): string {
	let commandLine = "";
	let hasPyFiles = false,
		hasJsFiles = false,
		hasExecutableFiles = false;
	const subDirs = new Set<string>();

	if (dirName === undefined) return (commandLine = "No files or dirs got found.");
	commandLine = `mkdir -p "${dirName}" && cd "${dirName}" && touch README.md `;

	fileNames.forEach((fileName) => {
		const parts = fileName.split("/");
		if (parts.length > 1) {
			parts.pop();
			const subDir = parts.join("/");
			subDirs.add(subDir);
		}
		fileName.endsWith(".py") && (hasPyFiles = true);
		fileName.endsWith(".js") && (hasJsFiles = true);
		!fileName.includes(".") && !fileName.endsWith("/") && (hasExecutableFiles = true);
	});

	subDirs.forEach((subDir) => {
		commandLine += ` && mkdir -p "${subDir}"`;
	});

	commandLine += ` && touch ${fileNames.join(" ")} `;
	commandLine += ` && echo "${dirName}" > README.md`;

	if (hasPyFiles) {
		commandLine += ` && find . -name "*.py" -exec sh -c 'echo "#!/usr/bin/python3" > "{}" && chmod u+x "{}"' \\;`;
	}
	if (hasJsFiles) {
		commandLine += ` && find . -name "*.js" -exec sh -c 'echo "#!/usr/bin/node" > "{}" && chmod u+x "{}"' \\;`;
	}
	if (hasExecutableFiles) {
		commandLine += ` && find . ! -name "*.*" ! -name "README.md" -type f -exec sh -c 'echo "#!/usr/bin/env bash" > "{}" && chmod u+x "{}"' \\;`;
	}

	return commandLine;
}

const copyCmdFiles = (sendResponse) => {
	const html = document.documentElement.outerHTML;
	const { dirName, fileNames } = scrapeFileNames(html);
	const commandLine = generateCommandLine(dirName, fileNames);

	const textarea = document.createElement("textarea");
	textarea.textContent = commandLine;
	document.body.appendChild(textarea);

	textarea.focus();
	textarea.select();

	try {
		const successful = document.execCommand("copy");
		const msg = successful ? "Command line copied to clipboard!" : "Could not copy command line to clipboard";
		console.log(msg);
		sendResponse({ success: true });
	} catch (err) {
		sendResponse({ success: false });
		console.error("Could not copy command line to clipboard: ", err);
	}

	document.body.removeChild(textarea);
};

export default copyCmdFiles;
