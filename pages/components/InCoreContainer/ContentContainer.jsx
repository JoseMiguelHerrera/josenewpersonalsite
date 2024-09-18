import styles from '../../../styles/Home.module.css';
import ContentBox from './ContentBox';
export default function ContentContainer(props) {

    const content = props.menuData[props.selectedId];

    return (
        
        <div className={styles.ContentContainer}>
            <ContentBox menuName={content.menuName} entries={content.entries}></ContentBox>
        </div>
    )
}
