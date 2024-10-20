import { useState} from "react";
import { useSelector } from "react-redux";
export const useTaskList = () => {
  const tasks = useSelector((state) => state.todo.tasks);
  const status = useSelector((state) => state.todo.status);
  const [filter, setFilter] = useState({
    showDone: true,
    showExpired: true,
    showCurrent: true,
    text: "",
    orderBy: "dn", //dn - normal dr - reverse
  });

  const filteredTasks = tasks.filter((el) => {
    if (!filter.showDone) {
      if (el.isCompleted) return false;
    }
    if (!filter.showExpired) {
      if (el.isExpired && !el.isCompleted) return false;
    }
    if (!filter.showCurrent) {
      if (!el.isExpired && !el.isCompleted) return false;
    }
    if (filter.text) {
      const str1 = filter.text.toLowerCase();
      const str2 = el.desc.toLowerCase();
      if (!str2.includes(str1)) return false;
    }
    return true;
  });

  const sortingFns = {
    dn: (a, b) => a.deadline - b.deadline,
    dr: (a, b) => b.deadline - a.deadline,
  };

  filteredTasks.sort(sortingFns[filter.orderBy]);
  return { setFilter, filteredTasks, status}
};
