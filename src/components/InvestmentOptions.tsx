import { useEffect, useState } from "react";
import type React from "react";
import { getPresaleData } from "../firebase/presaleService";
import styles from "./InvestmentOptions.module.css";

interface InvestmentOption {
  id: number;
  name: string;
  price: number;
  allocation: number;
  currency: string;
}

const InvestmentOptions: React.FC = () => {
  const [options, setOptions] = useState<InvestmentOption[]>([]);

  useEffect(() => {
    const fetchInvestmentOptions = async () => {
      try {
        const data = await getPresaleData();
        setOptions(data.investmentOptions);
      } catch (error) {
        console.error("Error fetching investment options:", error);
      }
    };

    fetchInvestmentOptions();
  }, []);

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div key={option.id} className={styles.option}>
          <span className={styles.label}>{option.name}</span>
          <span className={styles.value}>
            {option.allocation} ELY @ {option.price} {option.currency}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InvestmentOptions;
