import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import AnimatedLeadTitle from './AnimatedLeadTitle';

const pad = (n) => String(n).padStart(2, '0');

export default function Header({ headerData = [], isMenuOpen, menuToggleCallback }) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className={styles.Header}>
      <div className={styles.headerLeft}>
        <span className={styles.prompt}>jose@herrera</span>
        <span className={styles.promptDim}>:~$</span>
        <AnimatedLeadTitle headers={headerData} />
        <span className={styles.caret}></span>
      </div>

      <div className={styles.headerStats}>
        <span>SOLIDITY/EVM</span>
        <span className={styles.headerDivider}>│</span>
        <span className={styles.headerClock}>{clock}</span>
      </div>

      <button
        type="button"
        aria-label="Menu"
        onClick={menuToggleCallback}
        className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
