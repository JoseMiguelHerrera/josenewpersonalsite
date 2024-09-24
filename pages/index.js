'use client'
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import data from '../data.json';

import Header from './components/Header'
import CoreContainer from './components/CoreContainer'
import Footer from './components/Footer';

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Jose Herrera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#000000" />
      <main>
        <div className={styles.MainContainer}>
          <Header headerData={data.headerData} isMobile={isMobile} menuToggleCallback={() => setIsMenuOpen(!isMenuOpen)} ></Header>
          <CoreContainer data={data} isMobile={isMobile} isMenuOpen={isMenuOpen}  menuToggleCallback={() => setIsMenuOpen(!isMenuOpen)} ></CoreContainer>
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
          background-color: green;
          font-family: 'Courier New', Courier, monospace;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
