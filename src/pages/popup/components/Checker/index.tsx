import { useState, useEffect } from "react";
import { SelectionFilter } from "./SelectionFilter";
import { TaskList } from "./TaskList";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import { useData } from "../../context/DataContext";
import Tooltip from "@src/shared/components/Tooltip";
import InfoButton from "@src/shared/components/InfoButton";
import leftMsToTime from "@src/shared/utils/leftMsToTime";
import "./index.scss";

export const Checker: React.FC = () => {
	const { setTasks, checkedTasks, handleCheck, runningTasks, setRunningTasks } = useData();
	const [remainingTimeInMs, setRemainingTimeInMs] = useState<number | null>(null);
	const [quizAvailable, setQuizAvailable] = useState<boolean>(false);

	useEffect(() => {
		sendMessageToContent({ message: "get-project-data" }, (response) => {
			setRemainingTimeInMs(response.remainingTimeInMs);
			setQuizAvailable(response.quizAvailable);
		});

		sendMessageToContent({ message: "get-task-status" }, (response) => {
			const { taskStatus, taskIds } = response;
			const tasks = taskIds.map((taskId: string, idx: number) => ({
				taskId,
				status: taskStatus[idx],
			}));
			setTasks(tasks);
		});
	}, [setTasks]);

	const fullTimeString = leftMsToTime(remainingTimeInMs); // dd:hh:mm:ss
	const remainingTimeString = fullTimeString.replace(/ \d+S$/, ""); // dd:hh:mm

	const runChecker = () => {
		const tasksToRun = checkedTasks.filter((task) => !runningTasks.includes(task));
		setRunningTasks((prevRunningTasks) => [...prevRunningTasks, ...tasksToRun]);
		sendMessageToContent({ message: "run-checker", tasksToRun });
		sendMessageToContent({ message: "create-observers", tasksToRun });
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
				{!(remainingTimeInMs > 0) && !quizAvailable && (
					<button id="run-checker" className="slide" onClick={runChecker}>
						Run
					</button>
				)}
			</div>
			<hr />
			{remainingTimeInMs > 0 ? (
				<div className="checker-release">
					Checker will be released after <span>{remainingTimeString}</span>
				</div>
			) : quizAvailable ? (
				<div className="checker-release">You have to pass the quiz before running the checker</div>
			) : (
				<>
					<SelectionFilter />
					<TaskList onCheck={handleCheck} />
				</>
			)}
		</div>
	);
};
