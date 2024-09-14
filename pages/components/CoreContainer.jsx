import styles from '../../styles/Home.module.css';
import { useState } from 'react';

import Menu from './InCoreContainer/Menu';
import ContentContainer from './InCoreContainer/ContentContainer';

export default function CoreContainer() {


    const [selectedId, setSelectedId] = useState(0);

    const menuData = [
        {
            menuName: "About",
            id: 0
        },
        {
            menuName: "Experience",
            id: 1
        },
        {
            menuName: "Projects",
            id: 2
    
        },
        {
            menuName: "Social Media",
            id: 3
        },
        {
            menuName: "Publications",
            id: 4
        }
    ]

    return (
            <div className={styles.CoreContainer}>
                <Menu menuData={menuData} selectedId={selectedId} setSelectedId={setSelectedId} ></Menu>
                <ContentContainer selectedId={selectedId} menuData={menuData}></ContentContainer>
            </div>
    )
}
