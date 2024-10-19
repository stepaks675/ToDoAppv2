import { Tasks } from "./Task";
import { Filter, Order, Search } from "./Nav";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../icons/Loading";


export const TaskList = () => {
  const hasMounted = useRef(false);
  const tasks = useSelector(state => state.todo.tasks)
  const status = useSelector(state => state.todo.status)
  console.log(tasks)
  const [filter, setFilter] = useState({
    showDone: true,
    showExpired: true,
    showCurrent: true,
    text: "",
    orderBy: "dn", //dn - normal dr - reverse
  });

  useEffect(()=>{
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; 
    }
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])

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

  return (
    <div className="h-full w-2/3 box-border rounded-l-3xl flex flex-col items-center">
      <div className="h-10 w-full text-center text-3xl text-slate-700 border-b border-slate-200">
        Список задач
      </div>
      <div className="h-20 w-full border-b border-slate-200 flex justify-end px-4 py-1 gap-5">
        <div className="flex w-full py-2 gap-1 flex-col">
          <Search setFilter={setFilter} />
          <div className="flex pl-1">
            Упорядочить по: <Order setFilter={setFilter} />
          </div>
        </div>
        <div className="min-w-48 h-full border rounded-xl flex flex-col border-slate-400 overflow-hidden bg-green-50 items-start px-2 py-1 justify-around">
          <Filter setFilter={setFilter} quality={"showDone"}>
            Скрыть выполненные
          </Filter>
          <Filter setFilter={setFilter} quality={"showExpired"}>
            Скрыть просроченные
          </Filter>
          <Filter setFilter={setFilter} quality={"showCurrent"}>
            Скрыть текущие
          </Filter>
        </div>
      </div>
      {status=="pending" ? <Loading/> : <Tasks tasks={filteredTasks} /> }
    </div>
  );
};
