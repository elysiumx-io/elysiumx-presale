import React from 'react';
import SpotlightCard from './Components/SpotlightCard/SpotlightCard';
import Galaxy from './Backgrounds/Galaxy/Galaxy';
import styles from './ChainSelection.module.css';

interface ChainSelectionProps {
  onSelectChain: (chain: 'evm' | 'solana') => void;
}

const ChainSelection: React.FC<ChainSelectionProps> = ({ onSelectChain }) => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundWrapper}>
        <Galaxy
          density={0.8}
          glowIntensity={0.3}
          saturation={0.8}
          hueShift={240}
        />
      </div>
      <div className={styles.contentWrapper}>
        
        <h1 className={styles.title}>
          Choose Your Ecosystem
        </h1>
        <p className={styles.subtitle}>
          The ElysiumX Presale is now live. Please select your preferred network to participate.
        </p>
        <div className={styles.cardsWrapper}>
          <SpotlightCard 
            spotlightColor="rgba(88, 101, 242, 0.2)"
            className="w-full"
          >
            <div className={styles.cardContent}>
              <div>
                <h2 className={styles.cardTitle}>
                  EVM Chains
                </h2>
                <p className={styles.cardDescription}>
                  Connect to Ethereum, Polygon, Avalanche, BSC, and other compatible networks.
                </p>
              </div>
              <button 
                className={styles.selectButton}
                onClick={() => onSelectChain('evm')}
              >
                Select EVM
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </SpotlightCard>

          <SpotlightCard 
            spotlightColor="rgba(227, 47, 255, 0.2)"
            className="w-full"
          >
            <div className={styles.cardContent}>
              <div>
                <h2 className={styles.cardTitle}>
                  Solana
                </h2>
                <p className={styles.cardDescription}>
                  Connect to the high-speed Solana network for instant transactions.
                </p>
              </div>
              <button 
                className={styles.selectButton}
                onClick={() => onSelectChain('solana')}
              >
                Select Solana
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

export default ChainSelection;