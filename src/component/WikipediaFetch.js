import React, { useState, useEffect } from "react";
import axios from "axios";

const WikipediaFetch = ({ wantedTitle }) => {
  const [pageContent, setPageContent] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageImage, setPageImage] = useState("");

  useEffect(() => {
    axios
      .get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          format: "json",
          prop: "extracts|pageimages",
          titles: wantedTitle,
          pithumbsize: 300, // Adjust the size of the image as needed
          origin: "*",
        },
      })
      .then((response) => {
        const page = Object.values(response.data.query.pages)[0];
        setPageContent(page.extract);
        setPageTitle(page.title);
        setPageImage(page.thumbnail ? page.thumbnail.source : null);
      })
      .catch((error) => {
        console.error("Error fetching Wikipedia page:", error);
      });
  }, []);

  return (
    <div>
      <h2>{pageTitle}</h2>
      {pageImage && <img src={pageImage} alt={pageTitle} />}
      {/* <div dangerouslySetInnerHTML={{ __html: pageContent }} /> */}
    </div>
  );
};

export default WikipediaFetch;
