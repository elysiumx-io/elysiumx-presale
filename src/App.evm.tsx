import { useWeb3AuthConnect, useWeb3AuthDisconnect } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import ActionButtons from "./components/ActionButtons"
import Countdown from "./components/Countdown"
import Header from "./components/Header"
import InvestmentOptions from "./components/InvestmentOptions"
import Navbar from "./components/Navbar"
import ProgressBar from "./components/ProgressBar"
import type React from "react"
import styles from "./App.module.css"
import { useState } from "react"
import FadeContent from "./components/FadeContent"
import Aurora from "./components/Aurora"
import SpotlightCard from "./components/Components/SpotlightCard/SpotlightCard";

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0)
  const [purchaseCount, setPurchaseCount] = useState(0)
  const { connect, isConnected, connectorName } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { address } = useAccount();

  const handlePurchase = () => {
    setPurchaseCount((prevCount) => prevCount + 1)
  }

  return (
    <>
    <Aurora
  colorStops={["#e32fff","#00bbff", "#2d4af0"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
      <Navbar 
        connect={connect}
        disconnect={disconnect}
        isConnected={isConnected}
        address={address}
        connectorName={connectorName}
      />
      <div className={styles.container}>
        <FadeContent>
          <SpotlightCard spotlightColor={"rgba(26, 36, 180, 0.25)"}>
            <Header />
            <Countdown />
            <ProgressBar currentStage={currentStage} setCurrentStage={setCurrentStage} />
            <InvestmentOptions key={purchaseCount} />
            <ActionButtons 
              currentStage={currentStage} 
              onPurchase={handlePurchase}
              isConnected={isConnected}
              connect={connect}
            />
          </SpotlightCard>
        </FadeContent>
      </div>
    </>
  )
}

export default App
