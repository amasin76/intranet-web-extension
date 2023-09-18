import withSuspense from "@src/shared/hoc/withSuspense";
import { useState, useEffect } from "react";
import { GetFiles } from "./components/getFiles";
import { Checker } from "./components/Checker";
import { DataProvider } from "./context/DataContext";
import { Collapse } from "./components/Collapse";
import Socials from "./components/Socials";
import { sendMessageToContent } from "@src/shared/utils/messages";
import { TbRefresh } from "react-icons/tb";
import "@pages/popup/Popup.css";

export const Popup: React.FC = () => {
	const [isWindowLoaded, setIsWindowLoaded] = useState(false);
	const [advancedTasksLocked, setAdvancedTasksLocked] = useState(false);

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0].status === "complete") {
				setIsWindowLoaded(true);
			}
		});

		sendMessageToContent({ message: "get-project-data" }, (response) => {
			setAdvancedTasksLocked(response.advancedTasksLocked);
		});
	}, []);

	if (!isWindowLoaded) {
		// ADD: screen loader
	}

	const handleUnlockClick = () => {
		sendMessageToContent({ message: "unlock-advanced-tasks" }, (response) => {
			response.success && window.close(); // close the popup
		});
	};

	return (
		<>
			{advancedTasksLocked && (
				<a id="unlock-advanced-tasks" className="badge label" href="#" onClick={handleUnlockClick}>
					Unlock Advanced Tasks
					<TbRefresh className="icon" />
				</a>
			)}
			<Socials />
			<GetFiles />
			<DataProvider>
				<Checker />
			</DataProvider>
			<Collapse />
		</>
	);
};

export default withSuspense(Popup);
