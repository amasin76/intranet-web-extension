import { useState, useEffect, useCallback } from "react";
import { useData } from "../../context/DataContext";

interface TaskListProps {
	onCheck: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onCheck }) => {
	const { tasks, checkedTasks, setCheckedTasks, runningTasks, setRunningTasks, setTaskStatus } = useData();
	const [finishedTasks, setFinishedTasks] = useState<string[]>([]);

	const handleFinishedTasks = useCallback((request: any) => {
		if (request.message === "task_finished") {
			const { taskId, taskStatus } = request;

			// Update UI when task finished
			setTaskStatus(taskId, taskStatus);
			setRunningTasks((prevRunningTasks) => prevRunningTasks.filter((id) => id !== taskId));
			setCheckedTasks((prevCheckedTasks) =>
				prevCheckedTasks.includes(taskId) ? prevCheckedTasks.filter((id) => id !== taskId) : prevCheckedTasks
			);
			setFinishedTasks((prevFinishedTasks) =>
				prevFinishedTasks.includes(taskId) ? prevFinishedTasks : [...prevFinishedTasks, taskId]
			);

			setTimeout(() => {
				setFinishedTasks((prevFinishedTasks) => prevFinishedTasks.filter((id) => id !== taskId));
			}, 2000);
		}
	}, []);

	useEffect(() => {
		chrome.runtime.onMessage.addListener(handleFinishedTasks);

		return () => {
			chrome.runtime.onMessage.removeListener(handleFinishedTasks);
		};
	}, []);

	return (
		<div id="task-list">
			{tasks.map((task, index) => {
				const isChecked = checkedTasks.includes(task.taskId);
				const isTaskRunning = runningTasks.includes(task.taskId);
				const taskStatus = task.status === "yes" ? "green" : task.status === "no" ? "red" : "";

				return (
					<label
						key={task.taskId}
						className={`task-status ${taskStatus} ${isChecked ? "checked" : ""} ${
							isTaskRunning ? "running" : ""
						}`}
						data-task-id={task.taskId}
					>
						<input
							type="checkbox"
							onChange={() => onCheck(task.taskId)}
							checked={isChecked}
							disabled={isTaskRunning}
						/>
						<span className="task-index">{finishedTasks.includes(task.taskId) || index}</span>
						<span
							className={`spinner ${taskStatus}`}
							style={{ display: isTaskRunning ? "inline-block" : "none" }}
						></span>
						{finishedTasks.includes(task.taskId) && task.status === "yes" && (
							<span className="feedback">OK</span>
						)}
						{finishedTasks.includes(task.taskId) && task.status === "no" && (
							<span className="feedback">X</span>
						)}
					</label>
				);
			})}
		</div>
	);
};
