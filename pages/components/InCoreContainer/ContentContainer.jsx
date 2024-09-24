import styles from '../../../styles/Home.module.css';
import ContentBox from './ContentBox';
export default function ContentContainer({ menuData = [], selectedId = 0, isMobile }) {

    const content = menuData[selectedId] || { menuName: '', entries: [] };

    return (
        
        <div className={styles.ContentContainer}>
            {isMobile && <h3>{content.menuName}</h3>}
            <ContentBox menuName={content.menuName} entries={content.entries}></ContentBox>
        </div>
    )
}
