import { useTaskForm } from "../../service/hooks";
export const TaskForm = () => {
  const {text, date, checked, handleText, handleDate, handleVal, handleClear, handleCreate} = useTaskForm();
  return (
    <div className="flex items-center px-3 w-1/3 h-full ">
      <div className="flex items-center flex-col w-full h-1/2 border rounded-lg border-slate-300 p-3">
        <span className="text-lg font-bold">Создать задачу</span>
        <textarea
          className="w-full h-3/5 resize-none rounded-md border border-slate-400 focus:outline-slate-500 pt-1 px-1"
          value={text}
          onChange={handleText}
        ></textarea>
        <div className="w-full h-12 flex flex-wrap justify-start gap-2 rounded-lg z- my-2 ">
          <input
            className="rounded-lg border border-black px-2"
            type="date"
            value={date}
            onChange={handleDate}
          ></input>
          <div className="w-max flex items-center gap-1">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleVal}
            ></input>
            <span>Дедлайн не нужен</span>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <button
            className="w-min h-full px-2 py-1 text-xl border text-slate-700 border-slate-300 bg-green-300 rounded-xl hover:bg-green-200 hover:border-slate-400 transition-colors"
            onClick={() => {
              handleCreate()
            }}
          >
            Создать
          </button>
          <button
            className="w-min h-full px-2 py-1 text-xl border text-slate-700 border-slate-300 bg-red-300 rounded-xl hover:bg-red-200 hover:border-slate-400 transition-colors"
            onClick={handleClear}
          >
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
};
