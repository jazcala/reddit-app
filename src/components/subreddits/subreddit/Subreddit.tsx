import { TfiReddit } from "react-icons/tfi";
import { subredditProps } from "../../../types/types";
import styles from "./Subreddit.module.scss";

export default function Subreddit({
  subreddit,
  handleSubreddit,
  selectedSubreddit,
}: {
  subreddit: subredditProps;
  handleSubreddit: (subredditName: string) => void;
  selectedSubreddit: string;
}) {
  const { display_name, icon_img } = subreddit;

  const handleClick = () => {
    handleSubreddit(display_name);
  };

  return (
    <li
      className={`${styles.subreddit} ${
        selectedSubreddit === display_name ? styles.active : ""
      }`}
      onClick={handleClick}
    >
      <button>
        {display_name === "all" ? (
          <TfiReddit />
        ) : icon_img ? (
          <img src={icon_img} alt={`${display_name} image`} />
        ) : (
          <TfiReddit />
        )}
        <span className={styles.name}>{display_name}</span>
      </button>
    </li>
  );
}
