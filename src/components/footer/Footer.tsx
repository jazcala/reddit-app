import styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        2025 - By{" "}
        <a href="https://github.com/jazcala" target="_blank">
          @jazcala
        </a>{" "}
        -
        <a href="https://github.com/jazcala/reddit-app" target="_blank">
          {" "}
          sourceCode
        </a>
      </p>
    </footer>
  );
}
