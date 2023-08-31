import { useState } from 'react';

const useCheckedTasks = (initialTasks: string[] = []) => {
  const [checkedTasks, setCheckedTasks] = useState<string[]>(initialTasks);

  const handleCheck = (taskId: string) => {
    setCheckedTasks((prevCheckedTasks) =>
      prevCheckedTasks.includes(taskId)
        ? prevCheckedTasks.filter((id) => id !== taskId)
        : [...prevCheckedTasks, taskId]
    );
  };

  return { checkedTasks, handleCheck };
};

export default useCheckedTasks;
