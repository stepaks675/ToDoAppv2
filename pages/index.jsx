import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useMainUpdate } from "../service/hooks";
export default function Main() {
  useMainUpdate();
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
