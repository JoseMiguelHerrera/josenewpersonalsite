import styles from '../../../styles/Home.module.css';

const pad = (n) => String(n).padStart(2, '0');

const dateLine = (entry) => {
  if (entry.startDate && entry.endDate) return `${entry.startDate}  →  ${entry.endDate}`;
  return entry.startDate || entry.endDate || '';
};

export default function ContentBox({ entries = [], entryIndex = -1, scrollRef }) {
  return (
    <div ref={scrollRef} className={styles.ContentBoxScrollable}>
      {entries.map((entry, index) => {
        const active = entryIndex === index;
        return (
          <article
            key={index}
            data-entry={index}
            className={`${styles.ContentBoxEntry} ${active ? styles.ContentBoxEntryActive : ''}`}
            style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
          >
            <div className={styles.EntryHead}>
              <span className={styles.EntryNum}>{pad(index + 1)}</span>
              <h2 className={styles.EntryTitle}>{entry.title}</h2>
            </div>

            {(entry.startDate || entry.endDate) && (
              <div className={styles.EntryDate}>{dateLine(entry)}</div>
            )}

            {entry.paragraph && (
              <div className={styles.EntryBody}>
                {entry.paragraph.map((para, i) => (
                  <p key={i} className={styles.EntryParagraph}>{para}</p>
                ))}
              </div>
            )}

            {entry.link && (
              <a
                href={entry.link}
                target="_blank"
                rel="noreferrer"
                className={styles.EntryLink}
              >
                [ {(entry.customLinkTitle || 'Learn More').toLowerCase()} ↗ ]
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}
