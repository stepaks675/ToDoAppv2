import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddTask } from "../../service/store/slices/todoSlice";
export const useTaskForm = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState(false);

  function handleText(event) {
    setText(event.target.value);
  }

  function handleDate(event) {
    setChecked(false);
    setDate(event.target.value);
  }

  function handleClear() {
    setText("");
    setDate("");
  }

  function handleVal() {
    setChecked((prev) => !prev);
    setDate(Date.now() + 100000000000);
  }

  function handleCreate(){
    dispatch(
        asyncAddTask({
          desc: text,
          deadline: new Date(
            date || Date.now() + 1000 * 60 * 60
          ).getTime(),
          id: Math.max(...tasks.map((item) => item.id + 1), 1),
        })
      )
  }

  return {text, date, checked, handleText, handleDate, handleVal, handleClear,  handleCreate}
};
