import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";

import { useEffect } from "react";


import { useDispatch} from "react-redux";
import { updateTime  } from "../store/slices/timerSlice";
import { fetchTasks } from "../store/slices/todoSlice";

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  useEffect(async ()=>{
    dispatch(fetchTasks())
  },[])

  return (
    <div className="h-svh bg-gradient-to-tr from-green-100 to-blue-100 flex items-center justify-center">
      <div className="h-3/4 w-3/5 border border-slate-500 rounded-3xl bg-slate-50  flex">
        <TaskList />
        <div className="h-full w-0 border-r border-slate-300" />
        <TaskForm />
      </div>
    </div>
  );
}
