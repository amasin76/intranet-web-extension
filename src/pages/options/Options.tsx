// Options.tsx
import { useState, ChangeEvent } from "react";
import useStorage from "@src/shared/hooks/useStorage";
import userStyleStorage from "@src/shared/storages/userStyleStorage";
import "./Options.scss";

const Options: React.FC = () => {
	const { customCss } = useStorage(userStyleStorage);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setSelectedFile(file);

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const contents = e.target.result as string;
				console.log(contents);
				// Save the custom CSS in local storage
				userStyleStorage.set({ customCss: contents });
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className="container">
			<div className="stylify">
				<h1>My Stylish Extension Options</h1>
				<input accept=".css" id="file-input" type="file" onChange={handleFileChange} />
				<label htmlFor="file-input">Choose a CSS file</label>
				{selectedFile && <p>Selected file: {selectedFile.name}</p>}
			</div>
		</div>
	);
};

export default Options;
