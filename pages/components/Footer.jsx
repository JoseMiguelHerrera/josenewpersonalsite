import styles from '../../styles/Home.module.css';

export default function Footer() {
    return (
            <div className={styles.Footer}>
                <p>Jose Herrera {new Date().getFullYear()}</p>
            </div>
    )
}
