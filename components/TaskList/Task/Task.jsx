import DeleteIcon from "../../icons/DeleteIcon";
import {Timer} from "./Timer";
import clsx from "clsx";


import { useDispatch} from "react-redux";
import {asyncToggleCompleted } from "../../../store/slices/todoSlice";
export const Task = ({ task }) => {
  return (
    <TaskContainer isCompleted={task.isCompleted} isExpired={task.isExpired}>
      <DeleteIcon
        className={"absolute top-3 right-2 w-6 h-6 cursor-pointer"}
        id={task.id}
      />
      <TaskCheckBox isCompleted={task.isCompleted} id={task.id} />
      <TaskBody task={task} />
      
    </TaskContainer>
  );
}

const TaskCheckBox = ({ isCompleted, id }) => {
  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(asyncToggleCompleted( id ));
  };
  return (
    <div className="mr-3 flex items-center">
      <input
        type="checkbox"
        className="size-8"
        onChange={handleCheck}
        checked={isCompleted}
      ></input>
    </div>
  );
};

const TaskBody = ({ task }) => {
  return (
    <div className="flex flex-col w-full justify-start word">
      <div
        className={`text-lg max-w-[90%] break-all ${
          task.isCompleted ? "line-through text-green-700" : "no-underline"
        }`}
      >
        {task.desc}
      </div>
      <div className="font-sans text-red-950">
        До конца:{" "}
        <Timer
          keyTime={task.deadline}
          isCompleted={task.isCompleted}
          isExpired={task.isExpired}
          id={task.id}
        />
      </div>
    </div>
  );
};

const TaskContainer = ({ isCompleted, isExpired, children }) => {
  return (
    <div
      className={clsx(
        "flex p-2 relative items-center rounded-lg shadow-sm hover:text-slate-700 transition-colors border",
        {
          "shadow-red-200 border-red-200 bg-red-100 hover:bg-red-50":
            isExpired && !isCompleted,
          "shadow-green-200 border-green-200 bg-green-100 hover:bg-green-50":
            isCompleted,
          "shadow-slate-200 border-slate-300 bg-zinc-200 hover:bg-slate-200":
            !isCompleted && !isExpired,
        }
      )}
    >
      {children}
    </div>
  );
};
