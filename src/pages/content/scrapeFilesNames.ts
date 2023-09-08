import findElementByText from "./utils/findElementByText";

function scrapeFileNames(html: string): { dirName: string | undefined; fileNames: string[] } {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const fileNames: string[] = [];
	const taskCards = doc.querySelectorAll(".task-card");
	let dirName: string | undefined;

	taskCards.forEach((taskCard, idx) => {
		const fileElement = findElementByText(taskCard, "li", "File:");

		if (idx === 0) {
			const dirElement = findElementByText(taskCard, "li", "Directory:");
			dirName = dirElement?.querySelector("code")?.textContent;
		}
		if (fileElement) {
			const codeElements = fileElement.querySelectorAll("code");

			codeElements.forEach((codeElement) => {
				fileNames.push(codeElement.textContent.trim());
			});
		}
	});
	return { dirName, fileNames };
}

function generateCommandLine(dirName: string | undefined, fileNames: string[]): string {
	let commandLine = "";
	let hasPyFiles = false,
		hasJsFiles = false,
		hasExecutableFiles = false;
	const subDirs = new Set<string>();

	if (dirName) {
		commandLine = `mkdir "${dirName}" && cd "${dirName}" && touch README.md `;
	} else {
		commandLine =
			"# The current project doesn’t provide a strict file structure (e.g printf, simple shell..). \
This means that you have the freedom to create your own file structure for this project. \
Feel free to organize your files in a way that makes sense to you and helps you \
complete the project successfully🚀.\n\n # If this project is intended to have its own file \
structure, please report this as a bug on the GitHub issue with project name to fix it";
		return commandLine;
	}

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
		commandLine += ` && find . ! -name "*.*" ! -name "README.md" -type f -exec sh -c 'echo "#!/usr/bin/bash" > "{}" && chmod u+x "{}"' \\;`;
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
