// TODO: split code to other file
function scrapeFileNames(html: string): { dirName: string | undefined; fileNames: string[] } {
	let parser = new DOMParser();
	let doc = parser.parseFromString(html, "text/html");
	let dirElement = Array.from(doc.querySelectorAll("li")).find((li) =>
		li.textContent?.includes("Directory:")
	);
	let dirName = dirElement?.querySelector("code")?.textContent;
	let fileNames: string[] = [];
	let taskCards = doc.querySelectorAll(".task-card");
	taskCards.forEach((taskCard) => {
		let fileElements = taskCard.querySelectorAll("li");
		fileElements.forEach((fileElement) => {
			if (fileElement.textContent?.includes("File:")) {
				let fileText = fileElement.textContent.replace("File:", "").trim();
				let files = fileText.split(", ");
				files.forEach((file) => {
					fileNames.push(file.trim());
				});
			}
		});
	});
	return { dirName, fileNames };
}

function generateCommandLine(dirName: string | undefined, fileNames: string[]): string {
	let commandLine = `mkdir "${dirName}" && cd "${dirName}" && touch README.md `;
	let hasPyFiles = false,
		hasJsFiles = false,
		hasExecutableFiles = false;
	let subDirs = new Set<string>();

	fileNames.forEach((fileName) => {
		let parts = fileName.split("/");
		if (parts.length > 1) {
			parts.pop();
			let subDir = parts.join("/");
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
	let html = document.documentElement.outerHTML;
	let { dirName, fileNames } = scrapeFileNames(html);
	let commandLine = generateCommandLine(dirName, fileNames);

	let textarea = document.createElement("textarea");
	textarea.textContent = commandLine;
	document.body.appendChild(textarea);

	textarea.select();

	try {
		let successful = document.execCommand("copy");
		let msg = successful ? "Command line copied to clipboard!" : "Could not copy command line to clipboard";
		sendResponse({ success: true });
	} catch (err) {
		sendResponse({ success: false });
		console.error("Could not copy command line to clipboard: ", err);
	}

	document.body.removeChild(textarea);
};

export default copyCmdFiles;
