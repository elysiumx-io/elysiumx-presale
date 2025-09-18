import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ExternalLink, Briefcase, Info, FileText, Users } from 'lucide-react';

const imageUrl = new URL('/elysiumx-logo.png', import.meta.url).href;

const Navbar: React.FC = () => {
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

  // Inline styles for Glassmorphism and responsiveness
  const navbarStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '10px 20px',
    color: 'white',
    position: 'fixed',
    top: 0,
    zIndex: 9999,
    borderRadius: '15px',
    margin: '10px 20px',
    width: 'calc(100% - 40px)', // Adjust width for margins
  };

  const navLinkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    borderRadius: '5px',
  };

  const dropdownButtonStyle: React.CSSProperties = {
    ...navLinkStyle,
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    minWidth: '160px',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    top: '100%',
    left: 0,
  };

  const dropdownItemStyle: React.CSSProperties = {
    ...navLinkStyle,
    padding: '8px 15px',
    justifyContent: 'space-between',
  };

  const mobileMenuOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    width: '100%',
    height: 'auto',
    maxHeight: 'calc(100vh - 60px)', // Max height to prevent overflow
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    zIndex: 999,
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    transform: isMenuOpen ? 'translateY(0)' : 'translateY(-120%)',
    top: '80px', // Position below the navbar
  };

  const mobileNavLinkStyle: React.CSSProperties = {
    ...navLinkStyle,
    width: '100%',
    justifyContent: 'flex-start',
    padding: '15px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const mobileDropdownContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingLeft: '20px',
  };

  const mobileMenuToggleStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'block',
  };

  const desktopNavStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
  };

  // Media query logic for responsiveness
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav ref={navRef} style={navbarStyle}>
      {/* Logo Section */}
      <div style={{ cursor: 'pointer' }} onClick={() => window.open('/', '_blank')}>
        <img src={imageUrl} alt="ElysiumX logo" style={{ height: '40px' }} />
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div style={desktopNavStyle}>
          {/* Projects Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              style={dropdownButtonStyle}
              onMouseEnter={() => setActiveDropdown('projects')}
              onClick={() => toggleDropdown('projects')}
            >
              <Briefcase size={16} />
              <span>Projects</span>
              <ChevronDown size={16} style={{ transform: activeDropdown === 'projects' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
            </button>
            {activeDropdown === 'projects' && (
              <div style={dropdownMenuStyle} onMouseLeave={() => setActiveDropdown(null)}>
                <a href="https://gov.elysiumx.io" target='_blank' style={dropdownItemStyle} onClick={handleLinkClick}>
                  <span>Governance</span>
                  <ExternalLink size={16} />
                </a>
                <a href="https://app.elysiumx.io" target='_blank' style={dropdownItemStyle} onClick={handleLinkClick}>
                  <span>Exchange</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>

          <a href="https://elysiumx.io" style={navLinkStyle} onClick={handleLinkClick}>
            <Info size={16} />
            <span>About Us</span>
          </a>

          {/* Docs Dropdown */}
          <div style={{ position: 'relative' }}>
            <button 
              style={dropdownButtonStyle}
              onMouseEnter={() => setActiveDropdown('docs')}
              onClick={() => toggleDropdown('docs')}
            >
              <FileText size={16} />
              <span>Docs</span>
              <ChevronDown size={16} style={{ transform: activeDropdown === 'docs' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
            </button>
            {activeDropdown === 'docs' && (
              <div style={dropdownMenuStyle} onMouseLeave={() => setActiveDropdown(null)}>
                <a href="https://docs.elysiumx.io" target="_blank" rel="noopener noreferrer" style={dropdownItemStyle} onClick={handleLinkClick}>
                  <span>Whitepaper</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>

          <a href="https://elysiumx.io" target='_blank' style={navLinkStyle} onClick={handleLinkClick}>
            <Users size={16} />
            <span>Community</span>
          </a>
        </div>
      )}

      {/* Action Buttons (Desktop) */}
      {!isMobile && (
        <div >
          <a href="https://nonkyc.io?ref=68cbe0d10f9fb2fb035e8fe9" target="_blank" rel="noopener noreferrer" style={{
            ...navLinkStyle,
            backgroundColor: '#007bff',
            padding: '10px 20px',
            borderRadius: '5px',
          }}>
            Buy BTC
          </a>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button 
          style={mobileMenuToggleStyle}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Navigation Overlay */}
      {isMobile && isMenuOpen && (
        <div style={mobileMenuOverlayStyle} onClick={toggleMenu}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Mobile Links */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <button 
                  style={mobileNavLinkStyle}
                  onClick={(e) => { e.stopPropagation(); toggleDropdown('mobile-projects'); }}
                >
                  <Briefcase size={16} />
                  <span>Projects</span>
                  <ChevronDown size={16} style={{ transform: activeDropdown === 'mobile-projects' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                </button>
                {activeDropdown === 'mobile-projects' && (
                  <div style={mobileDropdownContentStyle}>
                    <a href="https://gov.elysiumx.io" target='_blank' style={dropdownItemStyle} onClick={handleLinkClick}>
                      <span>Governance</span> <ExternalLink size={16} />
                    </a>
                    <a href="https://app.elysiumx.io" target='_blank' style={dropdownItemStyle} onClick={handleLinkClick}>
                      <span>Exchange</span> <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>

              <a href="https://elysiumx.io" style={mobileNavLinkStyle} onClick={handleLinkClick}>
                <Info size={16} />
                <span>About Us</span>
              </a>

              <div style={{ position: 'relative' }}>
                <button 
                  style={mobileNavLinkStyle}
                  onClick={(e) => { e.stopPropagation(); toggleDropdown('mobile-docs'); }}
                >
                  <FileText size={16} />
                  <span>Docs</span>
                  <ChevronDown size={16} style={{ transform: activeDropdown === 'mobile-docs' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                </button>
                {activeDropdown === 'mobile-docs' && (
                  <div style={mobileDropdownContentStyle}>
                    <a href="https://docs.elysiumx.io" target="_blank" rel="noopener noreferrer" style={dropdownItemStyle} onClick={handleLinkClick}>
                      <span>Whitepaper</span> <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>

              <a href="https://elysiumx.io" target='_blank' style={mobileNavLinkStyle} onClick={handleLinkClick}>
                <Users size={16} />
                <span>Community</span>
              </a>
            </div>

            {/* Mobile Actions */}
            <div style={{ padding: '10px 20px' }}>
              <a href="https://nonkyc.io?ref=68cbe0d10f9fb2fb035e8fe9" target="_blank" rel="noopener noreferrer" style={{
                ...navLinkStyle,
                backgroundColor: '#007bff',
                padding: '10px 20px',
                borderRadius: '5px',
                width: '100%',
                justifyContent: 'center',
              }}>
                Buy BTC
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;