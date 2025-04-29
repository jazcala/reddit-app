import React, { useEffect, useState } from "react";
import styles from "../components/subreddits/Subreddits.module.scss";
import { FaBars } from "react-icons/fa";
// redux
import { useSelector } from "react-redux";
import { fetchSubreddits, fetchPosts } from "../api/api";
import { AppDispatch } from "../app/store";
// types
import { SubredditProps, SubredditsState } from "../types/types";

import Subreddit from "../components/subreddits/subreddit/Subreddit";
import { setQuery } from "../features/posts/postsSlice";

interface MockSubredditsProps {
  mockDispatch: AppDispatch;
}

const loading = "loading";
const failed = "failed";

const MyMockSubreddits: React.FC<MockSubredditsProps> = ({ mockDispatch }) => {
  // states
  const [mySidenavStyle, setMySidenavStyle] = useState({ width: "0" });
  const [selectedSubreddit, setSelectedSubreddit] = useState("all");
  const { subreddits, status, error } = useSelector(
    (state: { subreddits: SubredditsState }) => state.subreddits
  );

  const dispatch = mockDispatch;
  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const statusSubreddits = () => {
    if (status === loading) {
      return <p data-testid="loading_subreddits">Loading...</p>;
    }
    if (status === failed) {
      return (
        <p data-testid="error_subreddits">Error loading subreddits: {error}</p>
      );
    }
    return null;
  };

  /* Toogle open, close side navigation */
  function toogleNav() {
    if (mySidenavStyle.width === "250px") {
      setMySidenavStyle({ width: "0" });
    } else {
      setMySidenavStyle({ width: "250px" });
    }
  }
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    setMySidenavStyle({ width: "0" });
  }
  const handleSubreddit = (selected: string) => {
    setSelectedSubreddit(selected);
    dispatch(fetchPosts(selectedSubreddit));
    dispatch(setQuery(""));
    setMySidenavStyle({ width: "0" });
  };
  return (
    <>
      <aside
        className={styles.subreddits}
        id="mySidenav"
        style={mySidenavStyle}
      >
        <button
          className={styles.closebtn}
          onClick={closeNav}
          aria-label="close reddits nav"
        >
          &times;
        </button>
        <h2>Subreddits</h2>
        <ul>
          {status === "loading" || status === "failed"
            ? statusSubreddits()
            : subreddits.map((subreddit: SubredditProps, index: number) => (
                <Subreddit
                  key={index}
                  subreddit={subreddit}
                  handleSubreddit={handleSubreddit}
                  selectedSubreddit={selectedSubreddit}
                />
              ))}
        </ul>
      </aside>
      <button
        className={styles.filterBtn}
        onClick={toogleNav}
        aria-label="toggle reddits nav"
      >
        <FaBars />
      </button>
    </>
  );
};

export default MyMockSubreddits;
