import styles from '../../../styles/Home.module.css';
import ContentBox from './ContentBox';
export default function ContentContainer(props) {

    const content = props.menuData[props.selectedId];
    const isMobile = props.isMobile;

    return (
        
        <div className={styles.ContentContainer}>
            {isMobile && <h3>{content.menuName}</h3>}
            <ContentBox menuName={content.menuName} entries={content.entries}></ContentBox>
        </div>
    )
}
