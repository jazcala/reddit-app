import redditLogo from "../../assets/reddit.svg";
import "./Header.module.scss";

export default function Header() {
  return (
    <header>
      <a href="/">
        <img src={redditLogo} alt="Reddit Logo" />
        <h1>Reddit App</h1>
      </a>
    </header>
  );
}
