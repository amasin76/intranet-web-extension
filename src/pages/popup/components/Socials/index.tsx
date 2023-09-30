import { AiFillGithub, AiFillBug, AiFillEdit, AiFillStar } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import "./index.scss";

export const Socials = () => {
	return (
		<div className="socials">
			<a
				href="https://chrome.google.com/webstore/detail/alx-intranet/eagnmhadjdelkimfjbelmndejpepgmef/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillStar className="icon" />
			</a>
			<a href="https://forms.gle/BLn5yXcwQeK8aKgu5" target="_blank" rel="noopener noreferrer">
				<AiFillEdit className="icon" />
			</a>
			<a
				href="https://github.com/amasin76/intranet-chrome-extension/issues/new/choose"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillBug className="icon" />
			</a>
			<a
				href="https://github.com/amasin76/intranet-chrome-extension"
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiFillGithub className="icon" />
			</a>
			<a
				target="_blank"
				rel="noopener noreferrer"
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
