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
			let taskList = document.getElementById('task-list');
			taskStatus.forEach(function (status, index) {
				let label = document.createElement('label');
				label.classList.add('task-status');
				if (status === 'yes') {
					label.classList.add('green');
				} else if (status === 'no') {
					label.classList.add('red');
				}
				let checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode((index)));
				taskList.appendChild(label);
				const parentLabel = checkbox.parentElement;
				parentLabel.classList.add('checked');
				checkbox.checked = true;
				checkbox.addEventListener('change', () => {
					checkUncheckButton(checkbox);
				});
			});
		});
	});


	document.getElementById('run-script').addEventListener('click', function () {
		let runScriptButton = document.getElementById('run-script');
		runScriptButton.textContent = 'Running...';
		let checkboxes = document.querySelectorAll('#task-list input[type="checkbox"]');
		let taskIndices = [];
		checkboxes.forEach(function (checkbox, index) {
			if (checkbox.checked) {
				taskIndices.push(index);
			}
		});
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { message: "run_script", taskIndices: taskIndices }, function (response) {
				runScriptButton.textContent = 'Run Script';
			});
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
});


