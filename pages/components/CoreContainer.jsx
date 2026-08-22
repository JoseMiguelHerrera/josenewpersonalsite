import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Home.module.css';
import AsciiChainScene from './AsciiChainScene';
import Menu from './InCoreContainer/Menu';
import ContentContainer from './InCoreContainer/ContentContainer';

export default function CoreContainer({ data = {}, isMobile, isMenuOpen, menuToggleCallback }) {
  const menuData = data.menuData || [];
  const [selectedId, setSelectedId] = useState(0);
  const [entryIndex, setEntryIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollToEntry = (index) => {
    requestAnimationFrame(() => {
      const scroller = scrollRef.current;
      if (!scroller) return;
      const el = scroller.querySelector(`[data-entry="${index}"]`);
      if (!el) return;
      scroller.scrollTo({ top: Math.max(0, el.offsetTop - 8), behavior: 'smooth' });
    });
  };

  const selectSection = (id) => {
    setSelectedId(id);
    setEntryIndex(0);
    scrollToEntry(0);
    if (isMobile && isMenuOpen) menuToggleCallback();
  };

  // arrows change section, tab cycles entries within it
  useEffect(() => {
    const n = menuData.length;
    if (!n) return;

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setSelectedId((prev) => (prev + step + n) % n);
        setEntryIndex(0);
        scrollToEntry(0);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        const entries = (menuData[selectedId] || {}).entries || [];
        if (entries.length < 2) return;
        const step = e.shiftKey ? -1 : 1;
        setEntryIndex((prev) => {
          const next = (prev + step + entries.length) % entries.length;
          scrollToEntry(next);
          return next;
        });
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuData, selectedId]);

  const showMenuList = !isMobile || isMenuOpen;
  const showContent = !isMobile || !isMenuOpen;

  return (
    <div className={styles.CoreContainer}>
      <nav className={`${styles.MenuContainer} ${isMenuOpen ? styles.MenuContainerOpen : ''}`}>
        <div className={styles.animationBox}>
          <AsciiChainScene />
        </div>

        {showMenuList && (
          <Menu
            menuData={menuData}
            selectedId={selectedId}
            onSelect={selectSection}
            isMobile={isMobile}
          />
        )}

        {!isMobile && (
          <div className={styles.hints}>
            <div><span className={styles.hintKey}>↑/↓</span> change section</div>
            <div><span className={styles.hintKey}>tab</span> next entry</div>
          </div>
        )}
      </nav>

      {showContent && (
        <ContentContainer
          menuData={menuData}
          selectedId={selectedId}
          entryIndex={entryIndex}
          scrollRef={scrollRef}
        />
      )}
    </div>
  );
}
