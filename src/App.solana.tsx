import { useWeb3AuthConnect, useWeb3AuthDisconnect } from "@web3auth/modal/react";
import { useSolanaWallet } from "@web3auth/modal/react/solana";
import Navbar from "./components/Navbar"
import type React from "react"
import styles from "./App.module.css"
import Aurora from "./components/Aurora"
import CoinRemitterWidget from "./components/CoinRemitterWidget";

const App: React.FC = () => {
  const { isConnected, connectorName } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { accounts } = useSolanaWallet();

  return (
    <>
    <Aurora
  colorStops={["#e32fff","#00bbff", "#2d4af0"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
      <Navbar 
        disconnect={disconnect}
        isConnected={isConnected}
        address={accounts?.[0]}
        connectorName={connectorName}
      />
      <div className={styles.container}>
        <CoinRemitterWidget />
      </div>
    </>
  )
}

export default App
