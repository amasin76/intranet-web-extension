import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import type { ISourceOptions } from "tsparticles-engine";
import fireflies from "./presets/fireflies.json";
import sparkles from "./presets/sparkles.json";

// TODO: use localstorage wrapper
(async () => {
	const data = await chrome.storage.local.get("user-style-key");
	if (Object.keys(data).length === 0) return;

	const { particlesEnabled, selectedPresetParticles } = data["user-style-key"];
	if (!particlesEnabled) return;

	const particlesDiv = document.createElement("div");
	particlesDiv.id = "tsparticles";
	document.body.appendChild(particlesDiv);

	const style = document.createElement("style");
	style.innerHTML = `
		#tsparticles { 
			position: relative;
			z-index: -1; 
		}

		body {
			position: relative;
			z-index: 0;
		}`;
	style.id = "particles";
	document.head.appendChild(style);

	await loadFull(tsParticles);
	// TODO: use dynamic import
	if (data["user-style-key"]?.customParticles) {
		tsParticles.load("tsparticles", JSON.parse(data["user-style-key"].customParticles) as ISourceOptions);
	} else if (selectedPresetParticles === "fireflies") {
		tsParticles.load("tsparticles", fireflies as ISourceOptions);
	} else if (selectedPresetParticles === "sparkles") {
		tsParticles.load("tsparticles", sparkles as ISourceOptions);
	}
})();
