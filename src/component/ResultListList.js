import React from "react";
import ResultList from "./ResultList";

const ResultListList = ({ UrlListList }) => {
  if (!Array.isArray(UrlListList)) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mr-8 ml-8">
      {UrlListList.map((urlList, index) => (
        <div key={index} className="col-span-1">
          <ResultList UrlList={urlList} />
        </div>
      ))}
    </div>
  );
};

export default ResultListList;
