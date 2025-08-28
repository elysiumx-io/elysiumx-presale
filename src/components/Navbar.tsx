import './Navbar.css';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const imageUrl = new URL('/elysiumx-logo.png', import.meta.url).href;

interface NavbarProps {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  address?: string;
  connectorName?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ connect, disconnect, isConnected, address }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav ref={navRef} className="modern-navbar">
      {/* Logo Section */}
      <div className="navbar-brand" onClick={() => window.open('/', '_blank')}>
        <img src={imageUrl} alt="ElysiumX logo" className="brand-logo" />
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-nav desktop-only">
        {/* Projects Dropdown */}
        <div className="nav-dropdown">
          <button 
            className="nav-link dropdown-toggle"
            onClick={() => toggleDropdown('projects')}
            onMouseEnter={() => setActiveDropdown('projects')}
          >
            Projects 
            <ChevronDown className={`dropdown-icon ${activeDropdown === 'projects' ? 'rotated' : ''}`} />
          </button>
          <div className={`dropdown-menu ${activeDropdown === 'projects' ? 'show' : ''}`}>
            <a href="https://gov.elysiumx.io" target='_blank' className="dropdown-item">
              <span>Governance</span>
              <ExternalLink className="external-icon" />
            </a>
            <a href="https://app.elysiumx.io" target='_blank' className="dropdown-item">
              <span>Exchange</span>
              <ExternalLink className="external-icon" />
            </a>
          </div>
        </div>

        <a href="https://elysiumx.io" className="nav-link">About Us</a>

        {/* Docs Dropdown */}
        <div className="nav-dropdown">
          <button 
            className="nav-link dropdown-toggle"
            onClick={() => toggleDropdown('docs')}
            onMouseEnter={() => setActiveDropdown('docs')}
          >
            Docs 
            <ChevronDown className={`dropdown-icon ${activeDropdown === 'docs' ? 'rotated' : ''}`} />
          </button>
          <div className={`dropdown-menu ${activeDropdown === 'docs' ? 'show' : ''}`}>
            <a href="https://docs.elysiumx.io" target="_blank" rel="noopener noreferrer" className="dropdown-item">
              <span>Whitepaper</span>
              <ExternalLink className="external-icon" />
            </a>
          </div>
        </div>

        <a href="https://t.me/elysiumx_io" target='_blank' className="nav-link">Community</a>
      </div>

      {/* Action Buttons */}
      <div className="navbar-actions desktop-only">
        {isConnected ? (
          <div className="wallet-dropdown">
            <button 
              className="wallet-button connected"
              onClick={() => toggleDropdown('wallet')}
            >
              <div className="wallet-info">
                <span className="wallet-address">
                  {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "Connected"}
                </span>
                <span className="connection-status">Connected</span>
              </div>
              <ChevronDown className={`dropdown-icon ${activeDropdown === 'wallet' ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-menu right ${activeDropdown === 'wallet' ? 'show' : ''}`}>
              <button onClick={() => { disconnect(); handleLinkClick(); }} className="dropdown-item disconnect">
                Disconnect Wallet
              </button>
            </div>
          </div>
        ) : (
          <button onClick={connect} className="connect-button">
            Connect Wallet
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMenuOpen ? 'show' : ''}`}>
        <div className="mobile-nav-content">
          {/* Mobile Links */}
          <div className="mobile-nav-section">
            <div className="mobile-dropdown">
              <button 
                className="mobile-nav-link"
                onClick={() => toggleDropdown('mobile-projects')}
              >
                <span>Projects</span>
                <ChevronDown className={`dropdown-icon ${activeDropdown === 'mobile-projects' ? 'rotated' : ''}`} />
              </button>
              {activeDropdown === 'mobile-projects' && (
                <div className="mobile-dropdown-content">
                  <a href="https://gov.elysiumx.io" target='_blank' onClick={handleLinkClick} className="mobile-dropdown-item">
                    Governance <ExternalLink size={16} />
                  </a>
                  <a href="https://app.elysiumx.io" target='_blank' onClick={handleLinkClick} className="mobile-dropdown-item">
                    Exchange <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>

            <a href="https://elysiumx.io" onClick={handleLinkClick} className="mobile-nav-link">About Us</a>

            <div className="mobile-dropdown">
              <button 
                className="mobile-nav-link"
                onClick={() => toggleDropdown('mobile-docs')}
              >
                <span>Docs</span>
                <ChevronDown className={`dropdown-icon ${activeDropdown === 'mobile-docs' ? 'rotated' : ''}`} />
              </button>
              {activeDropdown === 'mobile-docs' && (
                <div className="mobile-dropdown-content">
                  <a href="https://docs.elysiumx.io" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick} className="mobile-dropdown-item">
                    Whitepaper <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>

            <a href="https://t.me/elysiumx_io" target='_blank' onClick={handleLinkClick} className="mobile-nav-link">Community</a>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-nav-actions">
            {isConnected ? (
              <>
                <div className="mobile-wallet-info">
                  <span className="mobile-wallet-address">
                    {address ? `${address.substring(0, 8)}...${address.substring(address.length - 6)}` : "Connected"}
                  </span>
                  <span className="mobile-connection-status">Connected</span>
                </div>
                <button onClick={() => { disconnect(); handleLinkClick(); }} className="mobile-action-button disconnect">
                  Disconnect Wallet
                </button>
              </>
            ) : (
              <button onClick={() => { connect(); handleLinkClick(); }} className="mobile-action-button connect">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
