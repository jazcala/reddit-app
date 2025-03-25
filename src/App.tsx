import redditLogo from "./assets/reddit.svg";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <a href="/">
          <img src={redditLogo} alt="Reddit Logo" className="logo" />
        </a>
      </header>
    </>
  );
}

export default App;
