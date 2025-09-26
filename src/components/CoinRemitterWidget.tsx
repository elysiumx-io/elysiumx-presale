
import React, { useState } from 'react';
import styles from './CoinRemitterWidget.module.css';

const CoinRemitterWidget: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.widgetContainer}>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      <iframe
        src="https://pay.coinpal.io/it/cashier/goods/PTL1000078281758228604"
        className={styles.iframe}
        style={{ display: isLoading ? 'none' : 'block' }}
        title="Coinremitter Presale Widget"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default CoinRemitterWidget;
