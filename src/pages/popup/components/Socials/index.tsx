import { AiFillGithub, AiFillBug, AiFillEdit, AiFillStar } from "react-icons/ai";
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
		</div>
	);
};

export default Socials;
