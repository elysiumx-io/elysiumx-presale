import { useWeb3AuthConnect, useWeb3AuthDisconnect } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import Navbar from "./components/Navbar"
import type React from "react"
import styles from "./App.module.css"
import Aurora from "./components/Aurora"
import CoinRemitterWidget from "./components/CoinRemitterWidget";

const App: React.FC = () => {
  const { isConnected, connectorName } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { address } = useAccount();

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
        address={address}
        connectorName={connectorName}
      />
      <div className={styles.container}>
        <CoinRemitterWidget />
      </div>
    </>
  )
}

export default App
