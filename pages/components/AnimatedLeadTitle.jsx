import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';

// Types each header line out, holds, deletes, moves to the next.
export default function AnimatedLeadTitle({ headers = [] }) {
  const [text, setText] = useState('');
  const timer = useRef(null);

  useEffect(() => {
    if (!headers.length) return;
    let i = 0, pos = 0, deleting = false;

    const tick = () => {
      const full = headers[i];
      if (!deleting) {
        pos++;
        if (pos >= full.length) {
          deleting = true;
          setText(full);
          timer.current = setTimeout(tick, 2200);
          return;
        }
      } else {
        pos--;
        if (pos <= 0) { deleting = false; i = (i + 1) % headers.length; }
      }
      setText(full.slice(0, pos));
      timer.current = setTimeout(tick, deleting ? 22 : 55);
    };

    tick();
    return () => clearTimeout(timer.current);
  }, [headers]);

  return <span className={styles.leadTitle}>{text}</span>;
}
