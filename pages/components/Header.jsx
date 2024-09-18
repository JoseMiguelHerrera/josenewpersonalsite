import styles from '../../styles/Home.module.css';
import AnimatedLeadTitle from './AnimatedLeadTitle'

export default function Header({headerData}) {
    return (
        <div className={styles.Header}>
            <div className={styles.AnimatedLeadTitleContainer}>
                <AnimatedLeadTitle headers={headerData}></AnimatedLeadTitle>
            </div>
        </div>
    )
}
