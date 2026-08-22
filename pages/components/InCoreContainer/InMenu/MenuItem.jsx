import styles from '../../../../styles/Home.module.css';

export default function MenuItem({ menuName, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${styles.MenuItem} ${selected ? styles.MenuItemSelected : ''}`}
    >
      <span className={styles.MenuItemMarker}>{selected ? '▸' : ' '}</span>
      <span className={styles.MenuItemLabel}>{menuName}</span>
    </button>
  );
}
