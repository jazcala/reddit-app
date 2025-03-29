import { useState } from "react";
import styles from "./Subreddits.module.scss";
import { FcReddit } from "react-icons/fc";
import { FaBars } from "react-icons/fa";

const subreddits = [
  "programming",
  "webdev",
  "androiddev",
  "iOSProgramming",
  "MachineLearning",
  "learnprogramming",
];

export default function Subreddits() {
  /* Set the width of the side navigation to 250px */
  const [mySidenavStyle, setMySidenavStyle] = useState({});
  function openNav() {
    setMySidenavStyle({ width: "250px" });
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    setMySidenavStyle({ width: "0" });
  }
  return (
    <>
      <aside
        className={styles.subreddits}
        id="mySidenav"
        style={mySidenavStyle}
      >
        <a href="#" className={styles.closebtn} onClick={closeNav}>
          &times;
        </a>
        <h2>Subreddits</h2>
        <ul>
          {subreddits.map((subreddit, index) => (
            <li key={index}>
              <FcReddit />
              <span>{subreddit}</span>
            </li>
          ))}
        </ul>
      </aside>
      <button className={styles.filterBtn} onClick={openNav}>
        <FaBars />
      </button>
    </>
  );
}
