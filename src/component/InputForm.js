import React, { useState } from "react";
import { Switch, Spin } from "antd";
import Suggestions from "./Suggestions";
import ResultGraph from "./ResultGraph";
import ResultListList from "./ResultListList";

export default function InputForm() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isBFS, setFunc] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [duration, setDuration] = useState("");
  const [isSingle, setMethod] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFunc = () => {
    setFunc(!isBFS);
  };

  const handleMethod = () => {
    setMethod(!isSingle);
  };

  const getTitleFromWikiUrl = (url) => {
    const parts = url.split("/");
    const index = parts.findIndex((part) => part === "wiki");
    return index !== -1 && index < parts.length - 1 ? parts[index + 1] : null;
  };

  const handleProcessClick = () => {
    setIsLoading(true);
    const algorithm = isBFS ? "bfs" : "ids";
    const results = isSingle ? "single" : "many";

    const source = getTitleFromWikiUrl(url1);
    const goal = getTitleFromWikiUrl(url2);

    if (!source || !goal) {
      console.error("Invalid URLs for source or goal");
      setIsLoading(false);
      return;
    }

    const queryParams = new URLSearchParams({
      source,
      goal,
    }).toString();

    const url = `http://localhost:9090/${algorithm}/${results}?${queryParams}`;

    fetch(url)
      .then((response) => {
        // if (!response.found) {
        //   throw new Error("Network response was not ok");
        // }
        return response.json();
      })
      .then((data) => {
        const { solutions, duration } = data;
        setSolutions(solutions);
        setDuration(duration);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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

        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <div className="text-lg mb-2 md:mb-0 md:mr-2">
            <span>
              {isSingle ? (
                <label className="text-2xl">Single Solution</label>
              ) : (
                <label className="text-2xl">Multiple Solution</label>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <Switch onClick={handleMethod} defaultChecked={isSingle} />
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

      {isLoading ? (
        <Spin tip="Loading..." size="large" />
      ) : (
        solutions.length > 0 && (
          <div className="mb-16">
            <ResultGraph data={solutions} />
            <ResultListList UrlListList={solutions} />
            <div className="text-white mt-4">
              <span>Duration: {duration}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
}
