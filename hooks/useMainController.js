import { useState, useEffect } from "react";
export default function useMainController(){
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
        const id = Math.max(...tasks.map(task=>task.id+1),1)
        setTasks((prev)=>{return [...prev, {id: id, desc: desc, isCompleted:false, isExpired: false, deadline: date}]})
    }

    return {
        tasks, dateStamp, updateTime, onDelete, onComplete, onExpire, onCreate
    }
}