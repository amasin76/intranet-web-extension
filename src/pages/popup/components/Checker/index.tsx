import { useEffect } from "react";
import { SelectionFilter } from "./SelectionFilter";
import { TaskList } from "./TaskList";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import { useData } from "../../context/DataContext";
import Tooltip from "@src/shared/components/Tooltip";
import InfoButton from "@src/shared/components/InfoButton";
import "./index.scss";

export const Checker: React.FC = () => {
	const { setTasks, checkedTasks, handleCheck, runningTasks, setRunningTasks } = useData();

	useEffect(() => {
		sendMessageToContent({ message: "get-task-status" }, (response) => {
			const { taskStatus, taskIds } = response;
			const tasks = taskIds.map((taskId: string, idx: number) => ({
				taskId,
				status: taskStatus[idx],
			}));
			setTasks(tasks);
		});
	}, [setTasks]);

	const runChecker = () => {
		const tasksToRun = checkedTasks.filter((task) => !runningTasks.includes(task));
		setRunningTasks((prevRunningTasks) => [...prevRunningTasks, ...tasksToRun]);
		console.log(tasksToRun);
		sendMessageToContent({ message: "run-checker", tasksToRun }, (response) => {});
		sendMessageToContent({ message: "create-observers", tasksToRun }, (response) => {});
	};

	return (
		<div className="checker">
			<div className="checker--title">
				<div className="icon-text">
					<h1 className="checker">Checker</h1>
					<Tooltip text="Please try to keep servers healthy 💚 by only running the checks you need">
						<InfoButton />
					</Tooltip>
				</div>
				<button id="run-checker" className="slide" onClick={runChecker}>
					Run
				</button>
			</div>
			<hr />
			<SelectionFilter />
			<TaskList onCheck={handleCheck} />
		</div>
	);
};
