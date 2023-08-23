function checkUncheckButton(checkbox) {
	const parentLabel = checkbox.parentElement;
	if (checkbox.checked) {
		parentLabel.classList.add('checked');
		checkbox.checked = true;
	} else {
		parentLabel.classList.remove('checked');
		checkbox.checked = false;
	}
}
document.getElementById('scrape-button').addEventListener('click', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: 'scrapeFileNames' }, function (response) {
			let scrapeButton = document.getElementById('scrape-button');
			if (response.success) {
				scrapeButton.classList.remove('error');
				scrapeButton.textContent = 'Copied to clipboard';
			} else {
				scrapeButton.classList.add('error');
				scrapeButton.textContent = 'Error copying to clipboard';
			}
		});
	});
});
document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { message: "get_task_status" }, function (response) {
			let taskStatus = response.taskStatus;
			let taskIds = response.taskIds;
			let taskList = document.getElementById('task-list');
			taskStatus.forEach(function (status, index) {
				let label = document.createElement('label');
				label.classList.add('task-status');
				label.setAttribute('data-task-id', taskIds[index]);
				if (status === 'yes') {
					label.classList.add('green');
				} else if (status === 'no') {
					label.classList.add('red');
				}
				let checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				let spinnerSpan = document.createElement('span');
				spinnerSpan.classList.add('spinner');
				// create a new span element to display the task number and feedback text
				let textSpan = document.createElement('span');
				textSpan.classList.add('task-index');
				textSpan.textContent = index;

				label.appendChild(checkbox);
				label.appendChild(spinnerSpan);
				label.appendChild(textSpan);
				taskList.appendChild(label);
				checkbox.addEventListener('change', () => {
					checkUncheckButton(checkbox);
				});
				const TaskElements = document.querySelectorAll('.task-status');
				TaskElements.forEach(element => {
					element.addEventListener('mouseover', () => {
						if (element.classList.contains('checked')) {
							element.style.opacity = '0.7';
						} else {
							element.style.opacity = '0.5';
						}
					});
					element.addEventListener('mouseout', () => {
						element.style.opacity = '';
					});
				});
			});
		});
	});


	document.getElementById('run-script').addEventListener('click', function () {
		let runScriptButton = document.getElementById('run-script');
		let checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
		let taskIndices = [];
		checkboxes.forEach(function (checkbox, index) {
			const parentLabel = checkbox.parentElement;
			if (checkbox.checked && !parentLabel.classList.contains('running')) {
				taskIndices.push(index);
				parentLabel.classList.add('running');
			}

		});
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { message: "run_script", taskIndices: taskIndices }, function (response) { });
			// send a create_observers message to create the MutationObserver instances
			chrome.tabs.sendMessage(tabs[0].id, { message: "create_observers" }, function (response) { });
		});
	});

	document.getElementById('select-all').addEventListener('change', function (event) {
		let checked = event.target.checked;
		let checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			parentLabel.classList.add('checked');
			checkbox.checked = true;
		});
	});

	document.getElementById('select-none').addEventListener('change', function (event) {
		let checked = event.target.checked;
		let checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			parentLabel.classList.remove('checked');
			checkbox.checked = false;
		});
	});

	document.getElementById('select-greens').addEventListener('change', function (event) {
		let checkall = document.querySelectorAll('.task-status input[type="checkbox"]');
		checkall.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			parentLabel.classList.remove('checked');
			checkbox.checked = false;
		});
		let checked = event.target.checked;
		let checkboxes = document.querySelectorAll('.task-status.green input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			if (checked) {
				parentLabel.classList.add('checked');
				checkbox.checked = true;
			}
			else {
				parentLabel.classList.remove('checked');
				checkbox.checked = false;
			}
		});
	});

	document.getElementById('select-reds').addEventListener('change', function (event) {
		let checkall = document.querySelectorAll('.task-status input[type="checkbox"]');
		checkall.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			parentLabel.classList.remove('checked');
			checkbox.checked = false;
		});
		let checked = event.target.checked;
		let checkboxes = document.querySelectorAll('.task-status.red input[type="checkbox"]');
		checkboxes.forEach(function (checkbox) {
			const parentLabel = checkbox.parentElement;
			if (checked) {
				parentLabel.classList.add('checked');
				checkbox.checked = true;
			}
			else {
				parentLabel.classList.remove('checked');
				checkbox.checked = false;
			}
		});
	});

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.message === 'spinner_hidden') {
			let hasTaskPassed = false;
			let taskId = request.taskId;
			let label = document.querySelector(`label[data-task-id="${taskId}"]`);
			let checkbox = label.querySelector('input[type="checkbox"]');
			let studentTaskDoneElement = new DOMParser().parseFromString(request.studentTaskDoneElement, 'text/html').body.firstChild;

			label.classList.remove('running');
			label.classList.remove('checked');
			checkbox.checked = false;
			if (studentTaskDoneElement.classList.contains('yes')) {
				label.classList.add('green');
				label.classList.remove('red');
				hasTaskPassed = true;
			} else {
				label.classList.add('red');
				label.classList.remove('green');
			}

			// get the textSpan element
			let textSpan = label.querySelector('.task-index');
			// update the text of the textSpan element to show temp feedback
			let originalText = textSpan.textContent;
			textSpan.textContent = hasTaskPassed ? 'OK' : 'X';

			console.log(`originalText: ${originalText}`); // log the original text

			setTimeout(function () {
				console.log('setTimeout called'); // log when the setTimeout function is called
				textSpan.textContent = originalText;
			}, 1000);
		}
	});

});


