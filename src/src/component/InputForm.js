import React, { useState } from "react";
import { Switch } from "antd";

export default function InputForm(){
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
    )
}