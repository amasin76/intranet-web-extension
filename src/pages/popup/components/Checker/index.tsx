import { useState, useEffect } from "react";
import { SelectionFilter } from "./SelectionFilter";
import { TaskList } from "./TaskList";
import { sendMessageToContent } from "@root/src/shared/utils/messages";
import { useData } from "../../context/DataContext";
import Tooltip from "@src/shared/components/Tooltip";
import InfoButton from "@src/shared/components/InfoButton";
import leftMsToTime from "@src/shared/utils/leftMsToTime";
import { TbRefresh } from "react-icons/tb";
import "./index.scss";

export const Checker: React.FC = () => {
	const { setTasks, checkedTasks, handleCheck, runningTasks, setRunningTasks } = useData();
	const [remainingTimeInMs, setRemainingTimeInMs] = useState<number | null>(null);
	const [quizAvailable, setQuizAvailable] = useState<boolean>(false);
	const [hasCheckerBtn, sethasCheckerBtn] = useState<boolean>(false);

	useEffect(() => {
		sendMessageToContent({ message: "get-project-data" }, (response) => {
			setRemainingTimeInMs(response.remainingTimeInMs);
			setQuizAvailable(response.quizAvailable);
			sethasCheckerBtn(response.hasCheckerBtn);
		});
	}, []);
	const remainingTimeString = leftMsToTime(remainingTimeInMs, false);

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
		sendMessageToContent({ message: "run-checker", tasksToRun });
		sendMessageToContent({ message: "create-observers", tasksToRun });
	};

	const handleRefreshPage = () => {
		sendMessageToContent({ message: "refresh-page" }, (response) => {
			response.success && window.close(); // close the popup
		});
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
				{!quizAvailable && hasCheckerBtn && (
					<button id="run-checker" className="slide" onClick={runChecker}>
						Run
					</button>
				)}
			</div>
			<hr />
			{quizAvailable ? (
				<div className="checker-release">You have to pass the quiz before running the checker</div>
			) : !hasCheckerBtn && remainingTimeInMs ? (
				<div className="checker-release">
					Checker will be released after
					{quizAvailable && <span>You pass the quiz</span>}
					{remainingTimeInMs > 0 && <span>{remainingTimeString}</span>}
					{remainingTimeInMs <= 0 && (
						<span>
							<a className="label" href="#" onClick={handleRefreshPage}>
								Refrech Page
								<TbRefresh className="icon" />
							</a>
						</span>
					)}
				</div>
			) : (
				<>
					<SelectionFilter />
					<TaskList onCheck={handleCheck} />
				</>
			)}
		</div>
	);
};
