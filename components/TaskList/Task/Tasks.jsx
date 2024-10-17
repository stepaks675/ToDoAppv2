import {Task} from "./Task";
export const Tasks = ({ tasks }) => {
  return (
    <div className="w-full h-full pl-4 pt-2 pr-2 flex flex-col gap-2 overflow-y-auto scroll-smooth ">
      {tasks.map((item, id) => (
        <Task key={id} task={item} />
      ))}
    </div>
  );
}
