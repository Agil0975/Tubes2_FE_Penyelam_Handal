import React, { useState } from "react";
import { Switch } from "antd";
import WikipediaFetch from "./WikipediaFetch";

export default function InputForm() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isBFS, setFunc] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleFunc = () => {
    isBFS ? setFunc(false) : setFunc(true);
  };

  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
  };

  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
  };

  const handleProcessClick = () => {
    setTriggerFetch(!triggerFetch);
  };

  const print = () => {
    console.log(url1);
    console.log(url2);
  };

  function getPageTitleFromWikiUrl(url) {
    const parts = url.split("/");

    const index = parts.findIndex((part) => part === "wiki");

    if (index !== -1 && index < parts.length - 1) {
      return parts[index + 1];
    } else {
      return null;
    }
  }

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
      <button className="addButton" onClick={handleProcessClick}>
        Process Wiki Race
      </button>
      {url1 && (
        <WikipediaFetch
          wantedTitle={getPageTitleFromWikiUrl(url1)}
          key={triggerFetch ? "1" : "2"}
        />
      )}
      {url2 && (
        <WikipediaFetch
          wantedTitle={getPageTitleFromWikiUrl(url2)}
          key={triggerFetch ? "3" : "4"}
        />
      )}
    </div>
  );
}
