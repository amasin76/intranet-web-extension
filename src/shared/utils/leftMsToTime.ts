const msToTime = (ms: number, showSeconds = true): string => {
	let seconds = Math.floor(ms / 1000);
	const days = Math.floor(seconds / 3600 / 24);
	seconds -= days * 3600 * 24;
	const hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	const minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	const timeUnits = [
		{ value: days, unit: "D" },
		{ value: hours, unit: "H" },
		{ value: minutes, unit: "M" },
		{ value: seconds, unit: "S" },
	];

	if (!showSeconds) {
		timeUnits.pop();
	}

	return timeUnits
		.filter((timeUnit) => timeUnit.value > 0)
		.map((timeUnit) => `${timeUnit.value}${timeUnit.unit}`)
		.join(" ");
};

export default msToTime;
