import styles from '../../../styles/Home.module.css';
import MenuItem from './InMenu/MenuItem';

export default function Menu({ menuData = [], selectedId, onSelect }) {
  return (
    <>
      <div className={styles.sectionsLabel}>SECTIONS</div>
      <div className={styles.MenuItems}>
        {menuData.map((item) => (
          <MenuItem
            key={item.id}
            menuName={item.menuName}
            selected={selectedId === item.id}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </div>
    </>
  );
}
