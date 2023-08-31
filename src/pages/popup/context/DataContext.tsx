import { createContext, useContext, useState, useEffect } from "react";

interface Task {
	taskId: string;
	status: string;
}

interface DataContextValue {
	tasks: Task[];
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setTaskStatus: (taskId: string, status: string) => void;
	runningTasks: string[];
	setRunningTasks: React.Dispatch<React.SetStateAction<string[]>>;
	checkedTasks: string[];
	setCheckedTasks: React.Dispatch<React.SetStateAction<string[]>>;
	handleCheck: (taskId: string) => void;
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextValue>({
	tasks: [],
	setTasks: () => {},
	setTaskStatus: () => {},
	runningTasks: [],
	setRunningTasks: () => {},
	checkedTasks: [],
	setCheckedTasks: () => {},
	handleCheck: () => {},
	filter: "",
	setFilter: () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
	const [runningTasks, setRunningTasks] = useState<string[]>([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		let newCheckedTasks: string[] = [];
		if (filter === "select-all") {
			newCheckedTasks = tasks.map((task) => task.taskId);
		} else if (filter === "select-none") {
			newCheckedTasks = [];
		} else if (filter === "select-greens") {
			newCheckedTasks = tasks.filter((task) => task.status === "yes").map((task) => task.taskId);
		} else if (filter === "select-reds") {
			newCheckedTasks = tasks.filter((task) => task.status === "no").map((task) => task.taskId);
		}
		setCheckedTasks(newCheckedTasks);
	}, [filter]);

	const handleCheck = (taskId: string) => {
		setCheckedTasks((prevCheckedTasks) =>
			prevCheckedTasks.includes(taskId)
				? prevCheckedTasks.filter((id) => id !== taskId)
				: [...prevCheckedTasks, taskId]
		);
	};

	const setTaskStatus = (taskId: string, status: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.taskId === taskId ? { ...task, status: status } : task))
		);
	};

	return (
		<DataContext.Provider
			value={{
				tasks,
				setTasks,
				setTaskStatus,
				checkedTasks,
				setCheckedTasks,
				handleCheck,
				runningTasks,
				setRunningTasks,
				filter,
				setFilter,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
