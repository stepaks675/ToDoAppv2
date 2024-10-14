export default function Filter({children, setFilter, quality }){
    function change(prop){
        setFilter(prev=> {
            return {...prev, [prop] : !prev[prop]}
        })
    }
    return <div className="flex items-center gap-1"><input type="checkbox" onChange={()=>{change(quality)}}/><span className="text-sm">{children}</span></div>
}