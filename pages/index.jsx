import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import useMainController from "../hooks/useMainController";


export default function Main() {
    const {tasks, dateStamp, updateTime, onDelete, onComplete, onExpire, onCreate} = useMainController();
  return <div className="h-svh bg-gradient-to-tr from-green-100 to-blue-100 flex items-center justify-center">
    <div className="h-3/4 w-3/5 border border-slate-500 rounded-3xl bg-slate-50  flex">
        <TaskList tasks={tasks} onComplete={onComplete} date={dateStamp} onDelete={onDelete} onExpire={onExpire}/>
        <div className="h-full w-0 border-r border-slate-300"/>
        <TaskForm onCreate={onCreate}/>
    </div>
  </div>;
}
