import styles from '../../../styles/Home.module.css';

export default function ContentBox({ menuName, entries=[] }) {
  return (
    <div className={styles.ContentBox}>
      <div className={styles.ContentBoxScrollable}>
        {entries.map((entry, index) => (
          <div key={index} className={styles.ContentBoxEntry}>
            <h3 className={styles.EntryTitle}>{entry.title}</h3>
            {/* Updated date display logic */}
            {(entry.startDate || entry.endDate) && (
              <p className={styles.EntryDate}>
                {entry.startDate && !entry.endDate && entry.startDate}
                {entry.startDate && entry.endDate && `${entry.startDate}`}
                {entry.startDate && entry.endDate && ' -> '}
                {entry.endDate && `${entry.endDate}`}
              </p>
            )}
            <p className={styles.EntryParagraph}>{entry.paragraph}</p>
            {entry.link && (
              <a href={entry.link} className={styles.EntryLink}>
                {entry.customLinkTitle || 'Learn More'}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


