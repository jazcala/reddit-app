import { FaRedditAlien } from "react-icons/fa";
import "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <a href="/">
        <FaRedditAlien data-testid="reddit-icon" />
        <h1>Reddit App</h1>
      </a>
    </header>
  );
}
