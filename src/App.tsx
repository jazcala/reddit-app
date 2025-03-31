import "./App.scss";
import Header from "./components/header/Header";
import Posts from "./components/posts/Posts";
import SearchBar from "./components/searchBar/SearchBar";
import SubReddits from "./components/subreddits/Subreddits";

export default function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <main>
        <SubReddits />
        <Posts />
      </main>
    </>
  );
}
