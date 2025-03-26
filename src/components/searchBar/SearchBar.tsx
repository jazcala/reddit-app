import { FaSearch } from "react-icons/fa";
import "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <section className="search-bar">
      <input type="text" placeholder="Search Reddit" />
      <button>
        <FaSearch />
      </button>
    </section>
  );
}
