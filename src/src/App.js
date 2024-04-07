import "./App.css";
import React, { useState } from "react";
import { Switch } from "antd";

function App() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isBFS, setFunc] = useState(true);

  const handleFunc = () => {
    isBFS ? setFunc(false) : setFunc(true);
  };

  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
    // console.log(url1);
  };

  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
    // console.log(url2);
  };

  const print = () => {
    console.log(url1);
    console.log(url2);
  };

  return (
    <div className="container">
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Stardos+Stencil:wght@400;700&family=Tauri&display=swap"
        rel="stylesheet"
      ></link>
      <h1 className="title">WIKI RACE PATHFINDER</h1>
      <div className="form-container">
        <div className="inputs-container">
          <input
            type="url"
            placeholder="URL 1"
            className="input"
            value={url1}
            onChange={handleUrl1Change}
          />
          <div className="arrow"></div>
          <input
            type="url"
            placeholder="URL 2"
            className="input"
            value={url2}
            onChange={handleUrl2Change}
          />
        </div>
        <div className="inputs-container">
          <Switch onClick={handleFunc} defaultValue={true} />
        </div>
        <div className="inpus-container">
          {isBFS ? (
            <label className="label">BFS Search Algorithm</label>
          ) : (
            <label className="label">IDS Search Algorithm</label>
          )}
        </div>
        <button className="addButton" onClick={print}>
          Process Wiki Race
        </button>
      </div>
    </div>
  );
}

export default App;
