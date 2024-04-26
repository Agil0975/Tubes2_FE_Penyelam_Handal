import React, { useState, useEffect, useRef } from "react";

const Suggestions = ({ setUrl, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);
  const dropdownRef = useRef(null);

  function getWikipediaUrl(title) {
    const formattedTitle = encodeURIComponent(title.replace(/\s+/g, "_"));
    return `https://en.wikipedia.org/wiki/${formattedTitle}`;
  }

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    if (query.startsWith("https://en.wikipedia.org")) {
      setShowDropdown(false);
      setUrl(query);
      return;
    }

    const fetchSuggestions = async () => {
      setIsFetching(true);
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();
        setSuggestions(data.query.search);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsFetching(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query, setUrl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (title) => {
    const wikiUrl = getWikipediaUrl(title);
    setUrl(wikiUrl);
    setQuery(title);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div className="relative w-80 mx-auto mt-10" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded text-black"
      />
      {isFetching && showDropdown && (
        <div className="absolute top-full left-0">Loading...</div>
      )}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full border border-gray-300 bg-white mt-1 rounded overflow-auto max-h-60 z-10">
          <ul className="m-0 p-0 text-black">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.pageid}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion.title)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
