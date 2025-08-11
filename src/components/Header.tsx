import type React from "react"
import styles from "./Header.module.css"

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>ELY Presale</h1>
      <p className={styles.subtitle}>Your investment opportunity starts here.</p>
    </div>
  )
}

export default Header

