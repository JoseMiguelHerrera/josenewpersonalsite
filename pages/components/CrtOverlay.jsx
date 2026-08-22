import styles from '../../styles/Home.module.css';

export default function CrtOverlay() {
  return (
    <>
      <div className={styles.crtVignette}></div>
      <div className={styles.crtScanlines}></div>
      <div className={styles.crtSweep}></div>
    </>
  );
}
