import { useState } from "react";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import "./index.scss";

export const Collapse: React.FC = () => {
	const [collapseAll, setCollapseAll] = useState(false);
	const [collapseSuccess, setCollapseSuccess] = useState(false);
	const [collapseFail, setCollapseFail] = useState(false);

	const handleCollapseAll = () => {
		sendMessageToContent({ message: "collapse-tasks-all" }, (response) => {
			if (response && response.success) {
				setCollapseAll((prevCollapseAll) => !prevCollapseAll);
			}
		});
	};

	const handleCollapseSuccess = () => {
		sendMessageToContent({ message: "collapse-tasks-success" }, (response) => {
			if (response && response.success) {
				setCollapseAll(false);
				setCollapseSuccess((prevCollapseSuccess) => !prevCollapseSuccess);
			}
		});
	};

	const handleCollapseFail = () => {
		sendMessageToContent({ message: "collapse-tasks-fail" }, (response) => {
			if (response && response.success) {
				setCollapseAll(false);
				setCollapseFail((prevCollapseFail) => !prevCollapseFail);
			}
		});
	};

	return (
		<div className="collapse">
			<h1>Collapse</h1>
			<hr />
			<div className="btn-grp">
				{/* // FIX: opposite state
				<button className="slide" onClick={handleCollapseAll}>
					All
				</button> */}
				<button className="slide" onClick={handleCollapseSuccess}>
					Done
				</button>
				<button className="slide" onClick={handleCollapseFail}>
					Fail
				</button>
			</div>
		</div>
	);
};
