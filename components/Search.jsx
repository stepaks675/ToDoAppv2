import SearchIcon from "./icons/SearchIcon";

import { useState, useEffect } from "react";
export default function Search({ setFilter }) {
  const [text, setText] = useState("");
  function handleClick() {
    setFilter((prev) => {
      return { ...prev, text: text };
    });
  }
  useEffect(() => {
    handleClick();
  }, [text]);

  return (
    <div className="flex items-center justify-start w-full gap-3">
      <input
        className="h-max text-lg w-full border px-2 border-slate-300 rounded-md overflow-hidden "
        type="text"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
        placeholder="Поиск по задаче"
      />
      <SearchIcon classNameInfo={"w-6 hover:scale-110 transition-all"}/>
    </div>
  );
}
