import React from "react";
import WikipediaFetch from "./WikipediaFetch";
import "../App.css";

const ResultList = ({ UrlList }) => {
  function getPageTitleFromWikiUrl(url) {
    const parts = url.split("/");

    const index = parts.findIndex((part) => part === "wiki");

    if (index !== -1 && index < parts.length - 1) {
      return parts[index + 1];
    } else {
      return null;
    }
  }

  if (!Array.isArray(UrlList)) {
    return null;
  }

  return (
    // <div className="divide-y divide-gray-100 dark:divide-gray-700 mb-4">
    <div className="bg-red-700 rounded-lg p-2 shadow-md">
      {UrlList.map((url, index) => {
        const [pageTitle, pageImage] = WikipediaFetch({
          wantedTitle: getPageTitleFromWikiUrl(url),
        });

        return (
          <div
            key={index}
            className="result-item p-1 rounded-md border-4 border-black bg-white mb-1"
          >
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex rounded-md p-1 transition-colors duration-300 hover:bg-red-400 dark:hover:bg-red-400 overflow-hidden"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg w-10 h-10"
                  src={pageImage ? pageImage : "./default_image.jpg"}
                  alt="image"
                />
              </div>
              <div className="w-full ps-3">
                <div className="text-black text-sm mb-1 dark:text-black font-semibold">
                  {pageTitle ? pageTitle : "Wikipedia Title"}
                </div>
                <div className="text-xs text-black dark:text-black">
                  {url ? url : "Wikipedia URL"}
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default ResultList;
