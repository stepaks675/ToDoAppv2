import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";


export default function Main() {
    const [tasks, setTasks] = useState([])
    const [dateStamp, setDateStamp] = useState(Date.now())
    useEffect(()=>{
        updateTime()
        let entries = Object.entries(localStorage)
        let filtered = entries.filter(item => item[0]!="ally-supports-cache")
        console.log(filtered)
        setTasks(filtered.map(item => JSON.parse(item[1])))
    },[])
    useEffect(()=>{
        tasks.forEach(el => {localStorage.setItem(el.id, JSON.stringify(el))})
        console.log("local storage updated")
    },[tasks])
    function onDelete(id){
        localStorage.removeItem(id)
        setTasks((prev)=>prev.filter(item => item.id!=id))
    }
    function onComplete(id){
        setTasks((prev)=>prev.map(item => item.id==id ? {...item, isCompleted: !item.isCompleted} : {...item}))
    }
    function onExpire(id){
        setTasks((prev)=>prev.map(item => item.id==id ? {...item, isExpired: true} : {...item}))
    }
    function updateTime(){
        setDateStamp(Date.now())
        setTimeout(()=>{updateTime()},10000)
    }
    function onCreate(desc, deadline){
        const date = new Date(deadline || Date.now()+1000*60*60).getTime()
        const id = tasks[tasks.length-1]?.id + 1 || 1
        setTasks((prev)=>{return [...prev, {id: id, desc: desc, isCompleted:false, isExpired: false, deadline: date}]})
    }
  return <div className="h-svh bg-gradient-to-tr from-green-100 to-blue-100 flex items-center justify-center">
    <div className="h-3/4 w-3/5 border border-slate-500 rounded-3xl bg-slate-50  flex">
        <TaskList tasks={tasks} onComplete={onComplete} date={dateStamp} onDelete={onDelete} onExpire={onExpire}/>
        <div className="h-full w-0 border-r border-slate-300"/>
        <TaskForm onCreate={onCreate}/>
    </div>
  </div>;
}
