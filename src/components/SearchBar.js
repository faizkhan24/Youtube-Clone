import React, { useRef, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({
  setShowSearchBar,
  showSearchBar,
  setSearchQuery,
  searchSuggestions = [],
}) => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && selectedSuggestionIndex > 0) {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedSuggestionIndex < searchSuggestions.length - 1
      ) {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
        setQuery(searchSuggestions[selectedSuggestionIndex]);
        setIsSearchBoxOpen(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSuggestionIndex, searchSuggestions]);

  return (
    <div className="my-2">
      <div className="flex items-center shadow-lg md:shadow-none">
        <BiArrowBack
          className="ml-1 md:hidden"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
        <div className="relative">
          <input
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                navigate(`results/?search_query=${e.target.value}`);
              }
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchBoxOpen(true);
              setQuery(e.target.value);
            }}
            onFocus={() => {
              setIsSearchBoxOpen(true);
            }}
            value={query}
            placeholder="Search"
            className="search-input bg-gray-100 outline-blue-400 rounded-full p-1 m-1 w-[25rem] md:p-2 md:bg-white md:border-2 md:rounded-r-none md:mr-0 md:w-[536px]"
          />
          <RxCross2
            className="absolute right-0 top-0 my-3 mx-3 text-2xl"
            onClick={() => {
              setQuery("");
              setIsSearchBoxOpen(false);
            }}
          />
        </div>

        <button
          onClick={(e) => {
            navigate(`results/?search_query=${query}`);
          }}
          className="search-button hidden md:bg-gray-100 md:block p-[0.61rem] px-5 text-xl m-0 rounded-full rounded-l-none border-2 border-l-0"
        >
          <CiSearch />
        </button>
      </div>
      {isSearchBoxOpen && searchSuggestions.length > 0 && (
        <div
          ref={wrapperRef}
          className="searchSuggestion border-2 z-10 rounded-xl py-2 w-[35rem] border-gray-100 absolute bg-white font-medium shadow-sm"
        >
          <ul className="">
            {searchSuggestions.map((item, i) => {
              return (
                <li
                  key={i}
                  className={
                    selectedSuggestionIndex === i
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }
                  onClick={() => {
                    setQuery(item);
                    setIsSearchBoxOpen(false);
                    setSelectedSuggestionIndex(-1);
                  }}
                >
                  <Link
                    className="search-link flex px-5 py-1 gap-2 items-center"
                    to={`results/?search_query=${item}`}
                  >
                    <AiOutlineSearch /> {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
