import styles from '../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import AsciiArtScene from './AsciiArtScene';

import Menu from './InCoreContainer/Menu';
import ContentContainer from './InCoreContainer/ContentContainer';

export default function CoreContainer(props) {
    const data = props.data?props.data:[];

    const isMenuOpen = props.isMenuOpen;
    console.log(isMenuOpen);
    const [selectedId, setSelectedId] = useState(0);
    if (!props.isMobile) {
        return (
            <div className={styles.CoreContainer}>
                <Menu menuData={data.menuData} selectedId={selectedId} setSelectedId={setSelectedId}></Menu>
                <ContentContainer selectedId={selectedId} menuData={data.menuData}></ContentContainer>
            </div>
        )
    } else {
        return (
            <div className={styles.CoreContainer}>
                <div className={styles.animationBox} >
                    {<AsciiArtScene></AsciiArtScene>}
                </div>
                {isMenuOpen && <Menu menuData={data.menuData} selectedId={selectedId} setSelectedId={setSelectedId} isMobile={true} isMenuOpen={isMenuOpen} menuToggleCallback={props.menuToggleCallback}    ></Menu>}

                {!isMenuOpen && <ContentContainer selectedId={selectedId}  isMobile={true} menuData={data.menuData}></ContentContainer>}


            </div>
        )
    }
}
