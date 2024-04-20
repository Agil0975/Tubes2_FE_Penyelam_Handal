import React, { useState } from "react";

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
