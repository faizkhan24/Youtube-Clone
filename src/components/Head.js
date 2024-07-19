import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useEffect, useState } from "react";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import store from "../utils/store";
import { cacheResults } from "../utils/searchSlice";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";
import { useTheme } from "../utils/theme-context";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const Head = () => {
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchCacheResults = useSelector((store) => store.search);
  const { theme, toggleTheme } = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCacheResults[searchQuery]) {
        setSearchSuggestions(searchCacheResults[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log("search", json);
    setSearchSuggestions(json[1]);

    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  return (
    <>
      {!showSearchBar && (
        <div className=" flex items-center justify-between">
          <div className="flex col-span-1 items-center  mx-3">
            <RxHamburgerMenu onClick={toggleMenuHandler} className="text-xl" />
            <Link to={'/'}>
              {theme === "dark" ? (
              <img
                className="h-16 md:h-20"
                src="\output-onlinepngtools.png"
              ></img>
            ) : (
              <img
                className="h-16 md:h-20"
                src="\pngegg (10).png"
                alt="YouTube Logo"
              />
            )}
            </Link>
          
          </div>

          <div className="hidden md:block col-span-8">
            <SearchBar
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
              setSearchQuery={setSearchQuery}
              searchSuggestions={searchSuggestions}
            />
          </div>

          <div className="flex space-x-2 mr-2 md:mr-4 text-xl md:col-span-1">
            <AiOutlineSearch
              className="md:hidden"
              onClick={() => setShowSearchBar(!showSearchBar)}
            />

            <div className="dark_mode md:block hidden">
              <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme}
                checked={theme == "dark"}
              />
              <label className="dark_mode_label " htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
              </label>
            </div>
            {/* <div className="mode-switch transition-all duration-1000 ease-in-out">
              <input
                type="checkbox"
                onChange={toggleTheme}
                
              ></input>
            </div> */}
            <FaUserCircle className="md:text-4xl " />
          </div>
        </div>
      )}
      {showSearchBar && (
        <SearchBar
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
          setSearchQuery={setSearchQuery}
          searchSuggestions={searchSuggestions}
        />
      )}
    </>
  );
};

export default Head;
