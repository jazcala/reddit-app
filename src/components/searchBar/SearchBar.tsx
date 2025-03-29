import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <section className={styles.searchBar}>
      <div>
        <input type="text" placeholder="Search Reddit" />
        <button>
          <FaSearch data-testid="search-icon" />
        </button>
      </div>
    </section>
  );
}
