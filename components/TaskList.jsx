import Tasks from "./Tasks"
import Filter from "./Filter"
import Search from "./Search"
import { useState } from "react"
export default function TaskList({tasks, onComplete, date, onExpire, onDelete}){
    const [filter, setFilter] = useState({showDone: true, showExpired: true, showCurrent: true, text:""})
    const filteredTasks = tasks.filter(el => {
        if (!filter.showDone){
            if (el.isCompleted) return false;
        }
        if (!filter.showExpired){
            if (el.isExpired && !el.isCompleted) return false;
        }
        if(!filter.showCurrent){
            if(!el.isExpired && !el.isCompleted) return false;
        }
        if(filter.text){
            const str1 = filter.text.toLowerCase();
            const str2 = el.desc.toLowerCase();
            if (!str2.includes(str1)) return false
        }
        return true;
    })
    return (
        <div className="h-full w-2/3 box-border rounded-l-3xl flex flex-col items-center">
            <div className="h-10 w-full text-center text-3xl text-slate-700 border-b border-slate-200">Список задач</div>
            <div className="h-20 w-full border-b border-slate-200 flex justify-end px-4 py-1 gap-5">
                <Search setFilter={setFilter}/>
                <div className="min-w-48 h-full border rounded-xl flex flex-col border-slate-400 overflow-hidden bg-green-50 items-start px-2 py-1 justify-around">
                    <Filter setFilter={setFilter} quality={"showDone"}>Скрыть выполненные</Filter>
                    <Filter setFilter={setFilter} quality={"showExpired"}>Скрыть просроченные</Filter>
                    <Filter setFilter={setFilter} quality={"showCurrent"}>Скрыть текущие</Filter>
                </div>
                
            </div>
            <Tasks tasks={filteredTasks} onComplete={onComplete} onDelete={onDelete} date={date} onExpire={onExpire}/>
        </div>
    )
}