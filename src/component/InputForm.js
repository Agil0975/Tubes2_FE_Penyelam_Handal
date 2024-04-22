import React, { useState } from "react";
import { Switch } from "antd";
import WikipediaFetch from "./WikipediaFetch";
import ResultList from "./ResultList";
import ResultListList from "./ResultListList";
import Suggestions from "./Suggestions";
import "../App.css";

export default function InputForm() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isBFS, setFunc] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const urlList = [
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
    [
      "https://en.wikipedia.org/wiki/Lockheed_Martin_F-22_Raptor",
      "https://en.wikipedia.org/wiki/Attack_aircraft",
      "https://en.wikipedia.org/wiki/Tactical_bombing",
    ],
  ];

  function getPageTitleFromWikiUrl(url) {
    const parts = url.split("/");

    const index = parts.findIndex((part) => part === "wiki");

    if (index !== -1 && index < parts.length - 1) {
      return parts[index + 1];
    } else {
      return null;
    }
  }

  const handleFunc = () => {
    setFunc(!isBFS);
  };

  const handleUrl1Change = (event) => {
    setUrl1(event.target.value);
  };

  const handleUrl2Change = (event) => {
    setUrl2(event.target.value);
  };

  const handleProcessClick = () => {
    setTriggerFetch(!triggerFetch);
    console.log(url1);
    console.log(url2);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-16">
      <div className="text-white p-6 mb-8">
        <div className="flex flex-col md:flex-row mb-4 items-center justify-center">
          <Suggestions
            placeholder="Search for Wiki page (URL 1)"
            setUrl={(wikiUrl) => setUrl1(wikiUrl)}
          />
          <div className="hidden md:flex items-center justify-center mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <Suggestions
            placeholder="Search for Wiki page (URL 2)"
            setUrl={(wikiUrl) => setUrl2(wikiUrl)}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <div className="text-lg mb-2 md:mb-0 md:mr-2">
            <span>
              {isBFS ? (
                <label className="text-2xl">BFS Search Algorithm</label>
              ) : (
                <label className="text-2xl">IDS Search Algorithm</label>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <Switch onClick={handleFunc} defaultChecked={isBFS} />
        </div>

        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
            onClick={handleProcessClick}
          >
            Process Wiki Race
          </button>
        </div>
      </div>

      <ResultListList UrlListList={urlList} />
    </div>
  );
}
