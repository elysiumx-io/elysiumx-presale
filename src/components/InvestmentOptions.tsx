import { useEffect, useState, useCallback, useMemo } from "react";
import type React from "react";
import { getPresaleData } from "../services/backendService";
import styles from "./InvestmentOptions.module.css";

interface InvestmentOption {
  id: number;
  name: string;
  price: number;
  allocation: number;
}

interface ContractAddresses {
  contractSolana: string;
  contractEvmETH: string;
  contractEvmAvax: string;
  contractEvmBsc: string;
  contractEvmFtm: string;
  contractEvmBase: string;
  contractEvmScroll: string;
  contractEvmOptimism: string;
  contractEvmArb: string;
}

interface PaymentOptions {
  usdt: ContractAddresses;
  usdc: ContractAddresses;
}

type CurrencyType = 'usdt' | 'usdc';

// Currency configuration untuk logo dan metadata
const CURRENCY_CONFIG = {
  usdc: {
    name: 'USDC',
    logo: '/icons/USDC.png',
    displayName: 'USD Coin'
  },
  usdt: {
    name: 'USDT',
    logo: '/icons/USDT.png',
    displayName: 'Tether USD'
  }
} as const;

const InvestmentOptions: React.FC = () => {
  const [options, setOptions] = useState<InvestmentOption[]>([]);
  const [_, setPaymentOptions] = useState<PaymentOptions | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyType>('usdc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize untuk mencegah re-render tidak perlu
  const currencyKeys = useMemo(() => Object.keys(CURRENCY_CONFIG) as CurrencyType[], []);

  const fetchInvestmentOptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPresaleData();
      setOptions(data.investmentOptions);
      setPaymentOptions(data.paymentOptions);
    } catch (err) {
      console.error("Error fetching investment options:", err);
      setError("Failed to load investment options");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInvestmentOptions();
  }, [fetchInvestmentOptions]);

  const handleCurrencyChange = useCallback((currency: CurrencyType) => {
    setSelectedCurrency(currency);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading investment options...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error}
          <button onClick={fetchInvestmentOptions} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Currency Selection Cards with Logos */}
      <div className={styles.currencyTabs}>
        {currencyKeys.map((currency) => {
          const config = CURRENCY_CONFIG[currency];
          const isActive = selectedCurrency === currency;
          
          return (
            <button
              key={currency}
              type="button"
              className={`${styles.currencyCard} ${isActive ? styles.active : ''}`}
              onClick={() => handleCurrencyChange(currency)}
              aria-label={`Select ${config.displayName}`}
              aria-pressed={isActive}
            >
              <img 
                src={config.logo} 
                alt={`${config.name} logo`}
                className={styles.currencyLogo}
                width={24}
                height={24}
                loading="lazy"
              />
              <span className={styles.currencyName}>{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Investment Options */}
      <div className={styles.optionsGrid}>
        {options.length > 0 ? (
          options.map((option) => (
            <div key={option.id} className={styles.option}>
              <span className={styles.label}>{option.name}</span>
              <span className={styles.value}>
                {option.allocation.toLocaleString()} ELY @ {option.price} {selectedCurrency.toUpperCase()}
              </span>
            </div>
          ))
        ) : (
          <div className={styles.noOptions}>No investment options available</div>
        )}
      </div>
    </div>
  );
};

export default InvestmentOptions;