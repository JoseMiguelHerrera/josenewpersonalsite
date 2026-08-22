import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

export const BOOT_LINES = [
  { text: 'BIOS v3.11 — POST ................ OK', d: 140 },
  { text: 'mounting /dev/phosphor ........... OK', d: 160 },
  { text: 'loading kernel modules .......... OK', d: 150 },
  { text: 'starting ascii render pipeline .. OK', d: 220 },
  { text: 'auth: jose@herrera ........ GRANTED', d: 260, accent: true },
  { text: '', d: 120 },
  { text: '> boot --profile', d: 320 }
];

export default function BootSequence() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer;
    const run = (i) => {
      if (i >= BOOT_LINES.length) {
        timer = setTimeout(() => setDone(true), 420);
        return;
      }
      setStep(i + 1);
      timer = setTimeout(() => run(i + 1), BOOT_LINES[i].d);
    };
    run(0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.boot} ${done ? styles.bootDone : ''}`}>
      <div className={styles.bootInner}>
        {BOOT_LINES.slice(0, step).map((line, i) => (
          <div key={i} className={line.accent ? styles.bootLineAccent : styles.bootLine}>
            {line.text}
          </div>
        ))}
        <span className={styles.bootCaret}></span>
      </div>
    </div>
  );
}
