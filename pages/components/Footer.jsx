import styles from '../../styles/Home.module.css';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <span>JOSE HERRERA © {new Date().getFullYear()}</span>
      <span className={styles.footerSecure}>SESSION SECURE — 2048-BIT</span>
    </footer>
  );
}
