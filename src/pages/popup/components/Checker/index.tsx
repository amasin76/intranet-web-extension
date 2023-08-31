import { useEffect } from "react";
import { SelectionFilter } from "./SelectionFilter";
import { TaskList } from "./TaskList";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import { useData } from "../../context/DataContext";
import "./index.scss";

export const Checker: React.FC = () => {
	const { tasks, setTasks, checkedTasks, handleCheck, runningTasks, setRunningTasks } = useData();

	useEffect(() => {
		sendMessageToContent({ message: "get-task-status" }, (response) => {
			const taskStatus = response.taskStatus;
			const taskIds = response.taskIds;
			const tasks = taskIds.map((taskId, index) => ({
				taskId,
				status: taskStatus[index],
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
				<h1 className="checker">Checker</h1>
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
