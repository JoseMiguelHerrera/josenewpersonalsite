import styles from '../../styles/Home.module.css';
import AnimatedLeadTitle from './AnimatedLeadTitle'
import { useState } from 'react';
export default function Header({ headerData=[], isMobile,menuToggleCallback,isMenuOpen }) {

    return (
        <div className={styles.Header}>
            <div className={styles.AnimatedLeadTitleContainer}>
                <AnimatedLeadTitle headers={headerData} isMobile={isMobile}></AnimatedLeadTitle>
            </div>
            {isMobile && 
            <div className={styles.headerButtonContainer} onClick={() => menuToggleCallback()}>
                <div className={styles.headerIcon}>
                   <div className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
                     <span></span>
                     <span></span>
                     <span></span>
                   </div>
                </div>
            </div>
            }
        </div>
    )
}