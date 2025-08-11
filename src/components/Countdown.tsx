import type React from "react"
import styles from "./Countdown.module.css"
import useCountdown from "../hooks/useCountdown"

const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <div className={styles.countdown}>
      <div className={styles.timeUnit}>
        <span className={styles.value}>{days}</span>
        <span className={styles.label}>Days</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.value}>{hours}</span>
        <span className={styles.label}>Hours</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.value}>{minutes}</span>
        <span className={styles.label}>Minutes</span>
      </div>
      <div className={styles.timeUnit}>
        <span className={styles.value}>{seconds}</span>
        <span className={styles.label}>Seconds</span>
      </div>
    </div>
  )
}

export default Countdown

