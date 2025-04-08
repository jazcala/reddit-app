import { FaSearch } from "react-icons/fa";
import { AppDispatch } from "../../app/store";
import styles from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";
import { fetchSearchResults } from "../../api/api";
import { setQuery } from "../../features/posts/postsSlice";
import { useState } from "react";

export default function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");

  const search = () => {
    const query = searchQuery.trim();
    if (query !== "") {
      dispatch(fetchSearchResults(query));
      dispatch(setQuery(query));
    }
  };

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      search();
    }
  }

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    search();
  };
  return (
    <section className={styles.searchBar}>
      <div>
        <input
          type="search"
          placeholder="Search Reddit"
          id="search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button onClick={handleSearch} type="submit">
          <FaSearch data-testid="search-icon" />
        </button>
      </div>
    </section>
  );
}
