import styles from '../../styles/Home.module.css';
import { useState } from 'react';

import Menu from './InCoreContainer/Menu';
import ContentContainer from './InCoreContainer/ContentContainer';

export default function CoreContainer(props) {

    const data = props.data;


    const [selectedId, setSelectedId] = useState(0);


    return (
        <div className={styles.CoreContainer}>
            <Menu menuData={data.menuData} selectedId={selectedId} setSelectedId={setSelectedId} ></Menu>
            <ContentContainer selectedId={selectedId} menuData={data.menuData}></ContentContainer>
        </div>
    )
}
