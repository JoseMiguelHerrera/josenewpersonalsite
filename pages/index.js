'use client'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import data from '../data.json';

import Header from './components/Header'
import CoreContainer from './components/CoreContainer'
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"
import { useState,useEffect } from 'react';

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
        console.log(window.innerWidth)
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    //don't know why this is needed but it is
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const toggleMenu = () => {
    console.log("toggleMenu")
    setIsMenuOpen(!isMenuOpen);
  }




  return (
    <div className={styles.container}>
      <Head>
        <title>Jose Herrera Web3 Software Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <meta property="og:image" content="https://josenewpersonalsitehaxxor.vercel.app/ogPicture.png"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta property="description" content="Jose Herrera: Senior Blockchain Engineer & Full-Stack Developer. Expert in Solidity, Web3, DeFi, React, Node.js, and cloud services. 7+ years crafting smart contracts, DApps, and scalable web solutions. Bridging blockchain innovation with robust full-stack development." />
      <meta name="description" content="Jose Herrera: Senior Blockchain/Web3 Engineer & Full-Stack Developer. Expert in Solidity, Web3, DeFi, React, Node.js, and cloud services. 7+ years crafting smart contracts, DApps, and scalable web solutions. Bridging blockchain innovation with robust full-stack development.">
      <meta property="og:site_name" content="Jose Herrera Blockchain/Web3 & Fullstack Software Engineer" />
      <meta property="og:title" content="Jose Herrera Blockchain/Web3 & Fullstack Software Engineer"></meta>
      <meta property="og:description" content="Expert in Solidity, Web3, DeFi, React, Node.js. 7+ years crafting smart contracts." />
      <main>
      <Analytics/>
        <div className={styles.MainContainer}>
          <Header headerData={data.headerData} isMobile={isMobile} isMenuOpen={isMenuOpen} menuToggleCallback={toggleMenu} ></Header>
          <CoreContainer data={data} isMobile={isMobile} isMenuOpen={isMenuOpen}  menuToggleCallback={toggleMenu} ></CoreContainer>
          {!isMobile && <Footer></Footer>}
        </div>
      </main>

      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          align-items: start;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: #001100;
          font-family: 'Courier New', Courier, monospace;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
