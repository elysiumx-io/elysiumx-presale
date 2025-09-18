
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ThankYou.module.css';
import { CheckCircle } from 'lucide-react';

const ThankYou: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <CheckCircle size={80} color="#48bb78" />
        </div>
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.message}>Thank you for your participation in the presale.</p>
        <p className={styles.message}>We appreciate your support.</p>
        <Link to="/" className={styles.button}>Back to Home</Link>
      </div>
    </div>
  );
};

export default ThankYou;
