import { sendMessageToContent } from "@root/src/shared/utils/messages";
import Switch from "@src/shared/components/Switch";
import useStorage from "@src/shared/hooks/useStorage";
import collapseStorage from "@src/shared/storages/collapseStorage";
import "./index.scss";

export const Collapse: React.FC = () => {
	const { collapseSuccess, collapseFail } = useStorage(collapseStorage);

	const handleCollapseSuccess = () => {
		sendMessageToContent(
			{ message: `collapse-tasks`, collapseSuccess: !collapseSuccess, collapseFail },
			(response) => {
				if (response && response.success) {
					collapseStorage.set((prevState) => ({
						...prevState,
						collapseSuccess: !prevState.collapseSuccess,
					}));
				}
			}
		);
	};

	const handleCollapseFail = () => {
		sendMessageToContent(
			{ message: `collapse-tasks`, collapseSuccess, collapseFail: !collapseFail },
			(response) => {
				if (response && response.success) {
					collapseStorage.set((prevState) => ({
						...prevState,
						collapseFail: !prevState.collapseFail,
					}));
				}
			}
		);
	};

	return (
		<div className="collapse">
			<h1>Collapse</h1>
			<hr />
			<div className="btn-grp">
				<h2>Tasks</h2>
				<label>
					Done
					<Switch checked={collapseSuccess} onChange={handleCollapseSuccess} />
				</label>
				<label>
					Fail
					<Switch checked={collapseFail} onChange={handleCollapseFail} />
				</label>
			</div>
		</div>
	);
};
