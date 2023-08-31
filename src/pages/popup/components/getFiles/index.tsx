import { useState } from "react";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import "./index.scss";

export const GetFiles: React.FC = () => {
	const [copyButton, setCopyButton] = useState("Tasks");

	const handleClick = () => {
		sendMessageToContent({ message: "scrape-file-names" }, function (response) {
			console.log(response);
			if (response.success) {
				setCopyButton("Copied 📋");
				setTimeout(() => setCopyButton("Tasks"), 1500);
			} else {
				setCopyButton("Error");
			}
		});
	};

	return (
		<div className="get-files">
			<h1>Init Files</h1>
			<hr />
			<div className="btn-grp">
				<button
					id="scrape-button"
					className={`slide ${copyButton === "Error" ? "error" : ""}`}
					onClick={handleClick}
				>
					{copyButton}
				</button>
				{/* TODO: add generate readme file */}
				<button className="slide readme" disabled={true}>
					README
				</button>
			</div>
		</div>
	);
};
