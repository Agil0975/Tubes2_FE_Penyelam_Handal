import React, { useState } from "react";
import { Switch, Spin, message } from "antd";
import Suggestions from "./Suggestions";
import ResultGraph from "./ResultGraph";
import ResultListList from "./ResultListList";

const isValidWikiUrl = (url) => {
  const pattern = /^https:\/\/en\.wikipedia\.org\/wiki\//;
  return pattern.test(url);
};

const doesWikipediaPageExist = async (title) => {
  console.log(title);
  if (!title || title.trim() === "") {
    return false;
  }

  const formattedTitle = title.trim().replace(/ /g, "_");

  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        formattedTitle
      )}&format=json&redirects=1&origin=*`
    );

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    const pageInfo = data.query.pages;

    const pageId = Object.keys(pageInfo)[0];

    return pageId !== "-1";
  } catch (error) {
    console.error("Error checking Wikipedia page:", error);
    return false;
  }
};

async function validateTwoWikipediaUrls(url1, url2) {
  const [isValid1, isValid2] = await Promise.all([
    doesWikipediaPageExist(url1),
    doesWikipediaPageExist(url2),
  ]);

  if (!isValid1 || !isValid2) {
    message.error("One or both Wikipedia pages are invalid");
    return false;
  }

  return true;
}

const concatWiki = (title) => {
  const baseUrl = "https://en.wikipedia.org/wiki/";
  const formattedTopic = title.replace(/\s+/g, "_");
  return baseUrl + formattedTopic;
};

export default function InputForm() {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [isBFS, setFunc] = useState(true);
  const [solutions, setSolutions] = useState([]);
  const [duration, setDuration] = useState("");
  const [depth, setDepth] = useState("");
  const [total_visited, setVisited] = useState("");
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

    validateTwoWikipediaUrls(url1, url2).then((isValid) => {
      console.log(isValid);
      if (isValid) {
        const algorithm = isBFS ? "bfs" : "ids";
        const results = isSingle ? "single" : "many";

        const source = isValidWikiUrl(url1) ? url1 : concatWiki(url1);
        const goal = isValidWikiUrl(url2) ? url2 : concatWiki(url2);

        console.log(doesWikipediaPageExist(url1), doesWikipediaPageExist(url2));
        console.log(source, goal);

        if (!source || !goal) {
          message.error("Invalid URLs for source or goal");
          setIsLoading(false);
          return;
        }

        const queryParams = new URLSearchParams({
          source: getTitleFromWikiUrl(source),
          goal: getTitleFromWikiUrl(goal),
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
            const { solutions, duration, total_visited, depth } = data;
            setSolutions(solutions);
            setDuration(duration);
            setVisited(total_visited);
            setDepth(depth);
            console.log(solutions);
          })
          .catch((error) => {
            console.error("Error fetching:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setSolutions([]);
        setDuration(0);
        setVisited(0);
        setDepth(0);
        setIsLoading(false);
        return;
      }
    });
  };

  return (
    <form>
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="text-white p-6 mb-8">
          <div className="flex flex-col md:flex-row mb-4 items-center justify-center">
            <Suggestions
              placeholder="Search for Wiki page (URL 1)"
              setUrl={(wikiUrl) => setUrl1(wikiUrl)}
            />
            <div className="hidden md:flex items-center justify-center mx-4 mt-10">
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
              type="button"
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
              <div className="text-white justify-center items-center flex mt-8">
                <span>
                  Duration: <span className="font-extrabold">{duration}</span>
                </span>
              </div>
              <div className="text-white justify-center items-center flex mb-8">
                <span>
                  Visited a total of{" "}
                  <span className="font-extrabold">
                    {total_visited} wikipedia articles
                  </span>{" "}
                  with found solution in{" "}
                  <span className="font-extrabold">{depth} minimum depth</span>
                </span>
              </div>
              <ResultListList UrlListList={solutions} />
            </div>
          )
        )}
      </div>
    </form>
  );
}
