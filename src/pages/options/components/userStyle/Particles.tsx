import { useState } from "react";
import Switch from "@src/shared/components/Switch";
import useStorage from "@src/shared/hooks/useStorage";
import { userStyleStorage } from "@src/shared/storages/userStyleStorage";

const Particles: React.FC = () => {
	const { particlesEnabled, presetsParticles, selectedPresetParticles } = useStorage(userStyleStorage);
	const [selectedPreset, setSelectedPreset] = useState<string | null>(selectedPresetParticles);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isEnabled = e.target.checked;
		userStyleStorage.update("particlesEnabled", isEnabled);
	};

	const handlePresetSelect = (preset: string) => {
		setSelectedPreset(preset);
		userStyleStorage.update("selectedPresetParticles", preset);
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<h3 className="text-2xl text-gray-400">Particles</h3>
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
				</div>
			)}
		</>
	);
};

export default Particles;
