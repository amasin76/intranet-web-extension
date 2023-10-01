import { useState, ChangeEvent } from "react";
import Switch from "@src/shared/components/Switch";
import useStorage from "@src/shared/hooks/useStorage";
import { userStyleStorage } from "@src/shared/storages/userStyleStorage";
import { BsPlusCircleFill } from "react-icons/bs";

const Custom: React.FC = () => {
	const { customEnabled, customCss, customParticles } = useStorage(userStyleStorage);
	const [selectedCss, setSelectedCss] = useState<string | null>(customCss);
	const [selectedParticles, setSelectedParticles] = useState<string | null>(customParticles);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
		const file = e.target.files ? e.target.files[0] : null;
		if (file) {
			readFile(file, type);
		}
	};

	const readFile = (file: File, type: string) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const contents = e.target.result as string;
			if (type === "css") {
				setSelectedCss(contents);
				userStyleStorage.update("customCss", contents);
			} else if (type === "particles") {
				setSelectedParticles(contents);
				userStyleStorage.update("customParticles", contents);
			}
		};
		reader.readAsText(file);
	};

	const handleCustom = () => (e: React.ChangeEvent<HTMLInputElement>) => {
		const isEnabled = e.target.checked;
		userStyleStorage.update("customEnabled", isEnabled);

		if (!isEnabled) {
			userStyleStorage.update("customCss", "");
			userStyleStorage.update("customParticles", "");
		}
	};

	return (
		<>
			<div className="flex items-center gap-4">
				<h3 className="text-2xl text-gray-400">Custom</h3>
				<Switch checked={customEnabled} onChange={handleCustom()} />
			</div>
			{customEnabled && (
				<div className="inline-flex flex-wrap mx-4 gap-8 text-gray-300">
					<div className="flex flex-1 items-center gap-4">
						<h4 className="text-xl">CSS</h4>
						<input
							accept=".css"
							id="file-input"
							type="file"
							onChange={(e) => handleFileChange(e, "css")}
							className="hidden"
						/>
						<label
							htmlFor="file-input"
							className="inline-flex items-center gap-1 ml-auto px-5 py-2.5 border-2 border-blue-500 text-blue-500 hover:text-blue-100 hover:bg-blue-500 rounded cursor-pointer"
						>
							<BsPlusCircleFill />
							Upload
						</label>
					</div>
					<div className="flex flex-1 items-center gap-4">
						<h4 className="text-xl">Particles</h4>
						<input
							accept=".json"
							id="particles-input"
							type="file"
							onChange={(e) => handleFileChange(e, "particles")}
							className="hidden"
						/>
						<label
							htmlFor="particles-input"
							className="inline-flex items-center gap-1 ml-auto px-5 py-2.5 border-2 border-blue-500 text-blue-500 hover:text-blue-100 hover:bg-blue-500 rounded cursor-pointer"
						>
							<BsPlusCircleFill />
							Upload
						</label>
					</div>
				</div>
			)}
		</>
	);
};

export default Custom;
