import withSuspense from "@src/shared/hoc/withSuspense";
import { useState, useEffect } from "react";
import { GetFiles } from "./components/getFiles";
import { Checker } from "./components/Checker";
import { DataProvider } from "./context/DataContext";
import { Collapse } from "./components/Collapse";
import "@pages/popup/Popup.css";
import { sendMessageToContent } from "@root/src/shared/utils/messages";

export const Popup: React.FC = () => {
	const [isWindowLoaded, setIsWindowLoaded] = useState(false);

	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (tabs[0].status === "complete") {
				setIsWindowLoaded(true);
			}
		});
	}, []);

	if (!isWindowLoaded) {
		// ADD: screen loader
	}

	return (
		<>
			<GetFiles />
			<DataProvider>
				<Checker />
			</DataProvider>
			<Collapse />
		</>
	);
};

export default withSuspense(Popup);
