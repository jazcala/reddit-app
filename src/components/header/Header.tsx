import { FaRedditAlien } from "react-icons/fa";
import "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <a href="/">
        <FaRedditAlien />
        <h1>Reddit App</h1>
      </a>
    </header>
  );
}
