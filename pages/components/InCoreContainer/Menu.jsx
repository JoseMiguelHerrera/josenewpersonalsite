import styles from '../../../styles/Home.module.css';
import MenuItem from './InMenu/MenuItem';
import AsciiArtScene from '../AsciiArtScene'
import { useState,useEffect } from 'react';


export default function Menu({ menuData = [], ...props }) {

    const [hoveredId, setHoveredId] = useState(null);

    const handleClick = (id) => {
        props.setSelectedId(id);

        if(props.isMobile){
            props.menuToggleCallback();
        }

    };

    const isLastMenuItem = (id) =>{
        const lastIndex=menuData.length-1;
        return id == lastIndex;
    }    
    return (
        <div className={styles.MenuContainer}>
            {!props.isMobile &&
            <div className={styles.animationBox} >
                {<AsciiArtScene></AsciiArtScene>}
            </div>  
            }
            <div className={styles.MenuItems}>
                {
                    menuData.map((item) => {
                        return (
                            <div
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                                className={`${hoveredId === item.id ? styles.MenuItemHover : styles.MenuItem}
                                            ${props.selectedId === item.id ? styles.MenuItemSelected : ""}
                                            ${isLastMenuItem(item.id) ? styles.MenuItemLast : ""}
                                            `}
                                onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}>
                                <MenuItem menuName={item.menuName} key={item.menuName, item.id}
                                >
                                </MenuItem>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
