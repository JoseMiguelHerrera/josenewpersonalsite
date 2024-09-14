import styles from '../../styles/Home.module.css';
import AnimatedLeadTitle from './AnimatedLeadTitle'

export default function Header() {
    return (
        <div className={styles.Header}>
            <div className={styles.AnimatedLeadTitleContainer}>
                <AnimatedLeadTitle></AnimatedLeadTitle>
            </div>
        </div>
    )
}
