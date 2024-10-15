import { useState, useEffect } from "react";
import ChangeOrderIcon from "./icons/ChangeOrderIcon";
export default function Order({ setFilter }) {
  const [isReverse, setIsReverse] = useState(false);
  useEffect(() => {
    setFilter((prev) => {
      return { ...prev, orderBy: isReverse ? "dr" : "dn" };
    });
  }, [isReverse]);
  return (
    <>
      <span className="pl-1 w-48 overflow-hidden">
        {isReverse ? "удалению дедлайна" : "приближению дедлайна"}
      </span>
      <ChangeOrderIcon
        className="pt-1 w-5 h-5 cursor-pointer"
        onClick={() => {
          setIsReverse((prev) => !prev);
        }}
      />
    </>
  );
}
