import './Navbar.css'; // Assuming you already have this file
import BlurText from "./BlurText";
import { ArrowRight, DollarSign, Menu, Pin } from 'lucide-react'; // Importing Lucide icons
import React, { useState } from 'react';

const imageUrl = new URL('/assets/images/logox.png', import.meta.url).href;

interface NavbarProps {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  address?: string;
  connectorName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ connect, disconnect, isConnected, address }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <div className="logo" onClick={() => window.open('https://silentbase.xyz/', '_blank')}>
        <img
          src={imageUrl}
          alt="ElysiumX logo"
          width="40"
          height="40"
        />
        <BlurText text="ElysiumX" className="text-gradient" />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {/* Replacing Font Awesome icon with Lucide Menu icon */}
        <Menu className="text-gradient" />
      </div>

      <div className={`menu ${isMenuActive ? 'active' : ''}`}>
        <div className="dropdown">
          <a href="#">Projects <Pin className="pin-icon" /></a>
          <div className="dropdown-content">
            <a href="https://gov.elysiumx.io" target='_blank'>Governance</a>
            <a href="https://app.elysiumx.io" target='_blank'>Exchange</a>
          </div>
        </div>
        <a href="https://elysiumx.io">About Us</a>
        <div className="dropdown">
          <a href="#">Docs <Pin className="pin-icon" /></a>
          <div className="dropdown-content">
            <a href="https://docs.elysiumx.io" target="_blank" rel="noopener noreferrer">Whitepaper</a>
          </div>
        </div>
        <a href="https://t.me/elysiumx_io" target='_blank'>Community</a>
      </div>

      <div className="actions">
        {isConnected ? (
          <div className="dropdown">
            <button className="btn buy-dao">
              {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connected"}
            </button>
            <div className="dropdown-content">
              <button onClick={() => disconnect()} className="btn buy-dao">
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => connect()} className="btn buy-dao">
            Connect Wallet
          </button>
        )}
        <button
          className="btn buy-dao"
          onClick={() => window.open('https://exchange.silentbase.xyz/', '_blank')}
        >
          {/* Replacing Font Awesome with Lucide DollarSign icon */}
          Buy $SOL
        </button>
      </div>
    </div>
  );
};

export default Navbar;
