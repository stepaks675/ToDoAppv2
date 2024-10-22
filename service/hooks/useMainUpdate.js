import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { updateTime  } from "../store/slices/timerSlice";
import { fetchTasks } from "../store/slices/todoSlice";
export const useMainUpdate = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(updateTime());
      }, 10000);
      return () => {
        clearInterval(interval);
      };
    }, [dispatch]);
  
    useEffect(()=>{
      async function fetchData(){dispatch(fetchTasks())}
      fetchData()
    },[])

}