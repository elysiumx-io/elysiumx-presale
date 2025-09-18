import Navbar from "./components/Navbar"
import type React from "react"
import styles from "./App.module.css"
import Aurora from "./components/Aurora"
import CoinRemitterWidget from "./components/CoinRemitterWidget";

const App: React.FC = () => {

  return (
    <>
    <Aurora
  colorStops={["#e32fff","#00bbff", "#2d4af0"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
      <Navbar />
      <div className={styles.container}>
        <CoinRemitterWidget />
      </div>
    </>
  )
}

export default App
