import styles from '../../../styles/Home.module.css';
import ContentBox from './ContentBox';

const pad = (n) => String(n).padStart(2, '0');

export default function ContentContainer({ menuData = [], selectedId = 0, entryIndex = 0, scrollRef }) {
  const content = menuData[selectedId] || { menuName: '', entries: [] };
  const entries = content.entries || [];
  const multi = entries.length > 1;

  const pathName = (content.menuName || '').toLowerCase().replace(/\s+/g, '-');
  const count = multi
    ? `${pad(entryIndex + 1)} / ${pad(entries.length)}`
    : `${entries.length} entry`;

  return (
    <main className={styles.ContentContainer}>
      <div className={styles.pathBar}>
        <span className={styles.pathName}>~/{pathName}</span>
        <span className={styles.entryCount}>{count}</span>
      </div>
      <ContentBox
        entries={entries}
        entryIndex={multi ? entryIndex : -1}
        scrollRef={scrollRef}
      />
    </main>
  );
}
