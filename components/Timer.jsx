import { Interval, DateTime } from "luxon";
import { useEffect } from "react";
import clsx from "clsx";
export default function Timer({ keyTime, currTime, isCompleted, onExpire, id, isExpired }) {
  //получает таймстемпы текущего времени и целевого, возвращает разницу в виде день час минута

  const start = DateTime.fromMillis(currTime);
  const end = DateTime.fromMillis(keyTime);
  const interval = Interval.fromDateTimes(start, end);
  const duration = interval.toDuration(["days", "hours", "minutes"]);
  let formatted = duration.isValid
    ? duration.toFormat("d 'дн.' h 'ч.' m 'мин.'")
    : "Expired";
  useEffect(()=>{if (formatted == "Expired" && !isExpired) {onExpire(id); console.log(`Вызван expire у ${id}`)}},[])
  
  let danger = 0;
  if (interval.isValid) {
    if (interval.length("day") < 5) danger = 1;
    if (interval.length("day") < 3) danger = 2;
    if (interval.length("day") < 1) danger = 3;
    if (interval.length("hour") < 12) danger = 4;
    if (interval.length("hour") < 6) danger = 5;
    if (interval.length("hour") < 1) danger = 6;
  } else danger=100;
  if (isCompleted) {danger =666, formatted = "Done!"}
  const className = clsx("leading-4 inline-block transistion-all",{
    0: "text-blue-500",
    1: "text-green-500",
    2: "text-green-400",
    3:"text-yellow-500",
    4:"text-orange-500",
    5:"text-red-500",
    6:"text-red-900",
    100: "text-white bg-red-500 w-16 text-center",
    666: "text-white bg-green-500 w-16 text-center"
  }[danger]);

  return <span className={className}>{formatted}</span>;
}
