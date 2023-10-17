import { useState } from "react";
import Switch from "@src/shared/components/Switch";
import useStorage from "@src/shared/hooks/useStorage";
import { userStyleStorage } from "@src/shared/storages/userStyleStorage";
import Tooltip from "@src/shared/components/Tooltip";
import InfoButton from "@src/shared/components/InfoButton";

const Particles: React.FC = () => {
	const { particlesEnabled, presetsParticles, selectedPresetParticles, particlesSettings } =
		useStorage(userStyleStorage);
	const [selectedPreset, setSelectedPreset] = useState<string | null>(selectedPresetParticles);
	const [fpsLimit, setFpsLimit] = useState<number>(particlesSettings?.fpsLimit || 30);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isEnabled = e.target.checked;
		userStyleStorage.update("particlesEnabled", isEnabled);
	};

	const handlePresetSelect = (preset: string) => {
		setSelectedPreset(preset);
		userStyleStorage.update("selectedPresetParticles", preset);
	};

	const handleFpsLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFpsLimit = Number(e.target.value);
		setFpsLimit(newFpsLimit);
		userStyleStorage.update("particlesSettings", { ...particlesSettings, fpsLimit: newFpsLimit });
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<div className="inline-flex items-center gap-2">
					<h3 className="text-2xl text-gray-400">Particles</h3>
					<Tooltip text="It may not function optimally on devices with limited resources">
						<InfoButton />
					</Tooltip>
				</div>
				<Switch checked={particlesEnabled} onChange={handleChange} />
			</div>
			{particlesEnabled && (
				<div className="inline-flex gap-4 ml-4 text-gray-300">
					<ul className="flex gap-4">
						{presetsParticles.map((preset, index) => (
							<li
								key={index}
								className={`cursor-pointer ${selectedPreset === preset && "border-b-2 border-green-500"}`}
								onClick={() => handlePresetSelect(preset)}
							>
								{preset.charAt(0).toUpperCase() + preset.slice(1)}
							</li>
						))}
					</ul>
					<div className="flex items-center gap-x-2 ml-auto">
						<label htmlFor="fpsLimit" className="text-sm">
							FPS Limit
						</label>
						<input
							type="number"
							id="fpsLimit"
							value={fpsLimit}
							onChange={handleFpsLimitChange}
							className="w-20 px-2 py-1 text-sm border border-gray-700 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default Particles;
