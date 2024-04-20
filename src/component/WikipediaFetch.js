import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

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

  return [pageTitle, pageImage];
};

export default WikipediaFetch;
