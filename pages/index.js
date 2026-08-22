'use client'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

import styles from '../styles/Home.module.css';
import data from '../data.json';

import Header from './components/Header';
import CoreContainer from './components/CoreContainer';
import Footer from './components/Footer';
import BootSequence from './components/BootSequence';
import CrtOverlay from './components/CrtOverlay';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile((prev) => {
        if (prev !== mobile) setIsMenuOpen(false);
        return mobile;
      });
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <>
      <Head>
        <title>Jose Herrera — Staff Protocol Engineer</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#020806" />
        <meta
          name="description"
          content="Jose Herrera: Staff Protocol Engineer — DeFi & cross-chain infrastructure. Solidity, Web3, wallet systems, React, Node.js. 8+ years shipping smart contracts, DApps, and scalable full-stack systems."
        />
        <meta property="og:site_name" content="Jose Herrera — Staff Protocol Engineer" />
        <meta property="og:title" content="Jose Herrera — Staff Protocol Engineer" />
        <meta
          property="og:description"
          content="Staff Protocol Engineer building DeFi and cross-chain wallet infrastructure. Solidity, Hyperliquid, EVM, full stack."
        />
        <meta property="og:image" content="https://josenewpersonalsitehaxxor.vercel.app/ogPicture.png" />
      </Head>

      <div className={styles.container}>
        <Analytics />
        <div className={styles.shell}>
          <Header
            headerData={data.headerData}
            isMenuOpen={isMenuOpen}
            menuToggleCallback={toggleMenu}
          />
          <CoreContainer
            data={data}
            isMobile={isMobile}
            isMenuOpen={isMenuOpen}
            menuToggleCallback={toggleMenu}
          />
          <Footer />
        </div>

        <BootSequence />
        <CrtOverlay />
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: #020806;
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          overflow: hidden;
        }
        * {
          box-sizing: border-box;
        }
        a {
          color: #2fe6e6;
          text-decoration: none;
        }
        a:hover {
          color: #9bffc2;
        }
        ::selection {
          background: #35f06a;
          color: #020806;
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #06120b;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e6b3e;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #35f06a;
        }
      `}</style>
    </>
  );
}
