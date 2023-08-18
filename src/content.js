let taskNum = '';
document.addEventListener('keydown', function (event) {
	if (event.keyCode >= 48 && event.keyCode <= 57) {
		if (event.shiftKey && taskNum.length < 2) {
			taskNum += String.fromCharCode(event.keyCode);
		} else {
			taskNum = String.fromCharCode(event.keyCode);
		}
		let task = document.querySelector('#task-num-' + taskNum);
		if (task) {
			task.scrollIntoView();
		}
	}
});

document.addEventListener('keyup', function (event) {
	if (event.keyCode === 16) taskNum = '';
	if (event.keyCode >= 48 && event.keyCode <= 57 && !event.shiftKey) taskNum = '';
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === 'scrapeFileNames') {
		function scrapeFileNames(html) {
			let parser = new DOMParser();
			let doc = parser.parseFromString(html, 'text/html');
			let dirElement = Array.from(doc.querySelectorAll('li')).find(li => li.textContent.includes('Directory:'));
			let dirName = dirElement?.querySelector('code')?.textContent;
			let fileNames = [];
			let taskCards = doc.querySelectorAll('.task-card');
			taskCards.forEach(taskCard => {
				let fileElements = taskCard.querySelectorAll('li');
				fileElements.forEach(fileElement => {
					if (fileElement.textContent.includes('File:')) {
						let fileName = fileElement.textContent.replace('File:', '').trim();
						fileNames.push(fileName);
					}
				});
			});
			return { dirName, fileNames };
		}


		function generateCommandLine(dirName, fileNames) {
			let commandLine = `mkdir "${dirName}" && cd "${dirName}" && touch README.md `;
			commandLine += fileNames.join(' ');
			commandLine += ` && echo "${dirName}" > README.md`;
			fileNames.forEach(fileName => {
				if (fileName.endsWith('.py')) {
					commandLine += ` && echo "#\\!/usr/bin/python3" > "${fileName}"`;
					commandLine += ` && chmod +x "${fileName}"`;
				} else if (fileName.endsWith('.js')) {
					commandLine += ` && echo "#\\!/usr/bin/node" > "${fileName}"`;
					commandLine += ` && chmod +x "${fileName}"`;
				} else if (!fileName.includes('.')) {
					commandLine += ` && echo "#\\!/usr/bin/bash" > "${fileName}"`;
					commandLine += ` && chmod +x "${fileName}"`;
				}
			});
			return commandLine;
		}

		let html = document.documentElement.outerHTML;
		let { dirName, fileNames } = scrapeFileNames(html);
		let commandLine = generateCommandLine(dirName, fileNames);

		let textarea = document.createElement('textarea');
		textarea.textContent = commandLine;
		document.body.appendChild(textarea);

		textarea.select();

		try {
			let successful = document.execCommand('copy');
			let msg = successful ? 'Command line copied to clipboard!' : 'Could not copy command line to clipboard';
			console.log(msg);
			sendResponse({ success: true })
		} catch (err) {
			sendResponse({ success: false })
			console.error('Could not copy command line to clipboard: ', err);
		}

		document.body.removeChild(textarea);
	}
});

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === "get_task_status") {
			let buttons = document.querySelectorAll('.student_task_done');
			let taskStatus = [];
			buttons.forEach(function (button) {
				if (button.classList.contains('yes')) {
					taskStatus.push('yes');
				} else if (button.classList.contains('no')) {
					taskStatus.push('no');
				} else {
					taskStatus.push('default');
				}
			});
			sendResponse({ taskStatus: taskStatus });
		} else if (request.message === "run_script") {
			let taskIndices = request.taskIndices;
			let buttons = document.querySelectorAll('.correction_request_test_send');
			taskIndices.forEach(function (index) {
				buttons[index].click();
			});
			sendResponse({ success: true });
		}
	}
);
