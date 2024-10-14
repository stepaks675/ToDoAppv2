import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";


export default function Main() {
    const [tasks, setTasks] = useState([{id:1, desc: "no no no mr fish", isCompleted:false, isExpired:false, deadline:1738806803472}, {id:2, desc: "I could....", isCompleted:false, isExpired:true, deadline:1728806803472}])
    const [dateStamp, setDateStamp] = useState(Date.now())
    useEffect(()=>{
        updateTime()
    },[])
    function onComplete(id){
        setTasks(tasks.map(item => item.id==id ? {...item, isCompleted: !item.isCompleted} : {...item}))
    }
    function onExpire(id){
        setTasks(tasks.map(item => item.id==id ? {...item, isExpired: true} : {...item}))
    }
    function updateTime(){
        setDateStamp(Date.now())
        setTimeout(()=>{updateTime()},10000)
    }
    function onCreate(desc, deadline){
        const date = new Date(deadline).getTime()
        const id = tasks[tasks.length-1]?.id + 1 || 1
        setTasks([...tasks, {id: id, desc: desc, isCompleted:false, isExpired: false, deadline: date}])
    }
    console.log(tasks)
  return <div className="h-svh bg-gradient-to-tr from-green-100 to-blue-100 flex items-center justify-center">
    <div className="h-3/4 w-3/5 border border-slate-500 rounded-3xl bg-slate-50  flex">
        <TaskList tasks={tasks} onComplete={onComplete} date={dateStamp} onExpire={onExpire}/>
        <div className="h-full w-0 border-r border-slate-300"/>
        <TaskForm onCreate={onCreate}/>
    </div>
  </div>;
}
