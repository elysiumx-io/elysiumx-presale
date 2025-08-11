import { useEffect, useState } from "react";
import type React from "react";
// import { addPurchase } from "../firebase/presaleService";
import { ethers } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RECIPIENT_ADDRESS = "0xdecb2b3fA2569c444eF592897EA39773718edE54";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Stage {
  price: number;
  maxAmount: number;
}

const stages: Stage[] = [
  { price: 0.0001, maxAmount: 1000000 },
  { price: 0.0002, maxAmount: 2000000 },
  { price: 0.0003, maxAmount: 3000000 },
  { price: 0.0004, maxAmount: 4000000 },
  { price: 0.0005, maxAmount: 5000000 },
];

const ActionButtons: React.FC<{ currentStage: number; onPurchase: () => void }> = ({
  currentStage,
  onPurchase,
}) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setCurrentAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsWalletConnected(true);
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet to connect.");
    }
  };

  const handleBuy = async () => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    setIsLoading(true);
    const stage = stages[currentStage];
    const totalPrice = stage.price * amountToBuy;

    try {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();

      // const urlParams = new URLSearchParams(window.location.search);
      // const referralAddress =
      //   urlParams.get("ref") || "0x0000000000000000000000000000000000000000";

      // const tx = await signer.sendTransaction({
      //   to: RECIPIENT_ADDRESS,
      //   value: ethers.utils.parseEther(totalPrice.toString()),
      //   data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(referralAddress)),
      // });

      // await tx.wait();

      // await addPurchase({
      //   amount: amountToBuy,
      -        //   price: stage.price,
      //   timestamp: new Date(),
      //   address: currentAccount,
      //   txHash: tx.hash,
      // });

      alert(`Successfully purchased ${amountToBuy} tokens!`);
      onPurchase();
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("An error occurred during the purchase. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      {!isWalletConnected ? (
        <button
          className="px-6 py-3 text-base font-medium text-white transition transform bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConnectWallet}
          disabled={isLoading}
        >
          Connect Web3 Wallet
        </button>
      ) : (
        <>
          <input
            type="number"
            value={amountToBuy}
            onChange={(e) =>
              setAmountToBuy(Math.max(1, Number.parseInt(e.target.value)))
            }
            min="1"
            className="w-24 p-2 text-base text-gray-100 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:border-blue-600"
          />
          <button
            className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-300 transition transform bg-gray-600 rounded-lg shadow-lg hover:bg-gray-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBuy}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Buy ${amountToBuy} ELY for ${(
                stages[currentStage].price * amountToBuy
              ).toFixed(4)} SOL`
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
