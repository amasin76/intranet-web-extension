import { AiFillGithub, AiFillBug, AiFillEdit, AiFillStar } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import "./index.scss";

export const Socials = () => {
	return (
		<div className="socials">
			<a
				href="https://chromewebstore.google.com/detail/alx-intranet/eagnmhadjdelkimfjbelmndejpepgmef"
				target="_blank"
				rel="noopener noreferrer"
				title="Rate us ❤️"
			>
				<AiFillStar className="icon" />
			</a>
			<a
				href="https://forms.gle/BLn5yXcwQeK8aKgu5"
				target="_blank"
				rel="noopener noreferrer"
				title="Feedback Form"
			>
				<AiFillEdit className="icon" />
			</a>
			<a
				href="https://github.com/amasin76/intranet-web-extension/issues/new/choose"
				target="_blank"
				rel="noopener noreferrer"
				title="Report Bug/Feature"
			>
				<AiFillBug className="icon" />
			</a>
			<a
				href="https://github.com/amasin76/intranet-web-extension"
				target="_blank"
				rel="noopener noreferrer"
				title="Github Repository"
			>
				<AiFillGithub className="icon" />
			</a>
			<a
				target="_blank"
				rel="noopener noreferrer"
				title="Go to Settings Page"
				onClick={() => {
					if (chrome && chrome.runtime && chrome.runtime.openOptionsPage) {
						chrome.runtime.openOptionsPage();
					} else {
						window.open(chrome.runtime.getURL("options.html"));
					}
				}}
			>
				<IoSettingsSharp className="icon" />
			</a>
		</div>
	);
};

export default Socials;
