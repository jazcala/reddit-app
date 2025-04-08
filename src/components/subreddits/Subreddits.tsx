import { useEffect, useState } from "react";
import styles from "./Subreddits.module.scss";
import { FaBars } from "react-icons/fa";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../../api/api";
import { AppDispatch } from "../../app/store";
// types
import {
  subredditProps,
  subredditsSliceInitialStateProps,
} from "../../types/types";

import Subreddit from "./subreddit/Subreddit";

export default function Subreddits() {
  // states
  const [mySidenavStyle, setMySidenavStyle] = useState({ width: "0" });
  const [selectedSubreddit, setSelectedSubreddit] = useState("all");
  const { subreddits, status, error } = useSelector(
    (state: { subreddits: subredditsSliceInitialStateProps }) =>
      state.subreddits
  );

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (status === "failed") {
    return (
      <div>
        <p>Error loading subreddits: </p>
        <p>{error}</p>
      </div>
    );
  }

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
    // dispatch(fetchPosts(selectedSubreddit));
  };
  return (
    <>
      <aside
        className={styles.subreddits}
        id="mySidenav"
        style={mySidenavStyle}
      >
        <a
          href="#"
          className={styles.closebtn}
          onClick={closeNav}
          aria-label="close"
        >
          &times;
        </a>
        <h2>Subreddits</h2>
        <ul>
          {status === "loading" ? (
            <p>Loading subreddits...</p>
          ) : (
            subreddits.map((subreddit: subredditProps, index: number) => (
              <Subreddit
                key={index}
                subreddit={subreddit}
                handleSubreddit={handleSubreddit}
                selectedSubreddit={selectedSubreddit}
              />
            ))
          )}
        </ul>
      </aside>
      <button className={styles.filterBtn} onClick={toogleNav}>
        <FaBars />
      </button>
    </>
  );
}
