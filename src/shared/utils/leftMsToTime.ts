const msToTime = (ms) => {
	let seconds = Math.floor(ms / 1000);
	const days = Math.floor(seconds / 3600 / 24);
	seconds -= days * 3600 * 24;
	const hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	const minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	const dDisplay = `${days}D`;
	const hDisplay = `${hours}H`;
	const mDisplay = `${minutes}M`;
	const sDisplay = `${seconds}S`;

	return [dDisplay, hDisplay, mDisplay, sDisplay].filter(Boolean).join(" ");
};

export default msToTime;
