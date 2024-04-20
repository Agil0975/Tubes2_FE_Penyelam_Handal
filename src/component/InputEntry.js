import React, { useState } from "react";
import "../App.css";

const InputEntry = () => {
  const [value, setValue] = useState("");

  const setValueHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={setValueHandler}></input>
    </div>
  );
};

export default InputEntry;
