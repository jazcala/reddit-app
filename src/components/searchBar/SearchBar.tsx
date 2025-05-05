import { FaSearch } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AppDispatch } from "../../app/store";
import styles from "./SearchBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../api/api";
import { setQuery } from "../../features/posts/postsSlice";
import { useState, useEffect } from "react";
import { PostsState } from "../../types/types";

export default function SearchBar() {
  const { query } = useSelector((state: { posts: PostsState }) => state.posts);

  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

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

  const clearSearchField = () => {
    setSearchQuery("");
    dispatch(setQuery(""));
  };

  return (
    <section className={styles.searchBar} data-testid="search-bar">
      <div>
        <input
          type="search"
          placeholder="Search Reddit"
          id="search"
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          data-testid="search-input"
        />
        {searchQuery.length > 0 && (
          <button
            className={styles.cancelButton}
            onClick={clearSearchField}
            aria-label="clear search input"
            data-testid="clear-search-input"
          >
            <MdCancel />
          </button>
        )}
        <button
          className={styles.searchButton}
          onClick={handleSearch}
          type="submit"
          aria-label="search"
          data-testid="search-button"
        >
          <FaSearch data-testid="search-icon" />
        </button>
      </div>
    </section>
  );
}
