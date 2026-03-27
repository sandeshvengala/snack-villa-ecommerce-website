import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Header.css';
import { auth } from '../lib/firebase';
import { useAuthStore, useCartStore } from '../stores';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const itemCount = useCartStore((state: any) => state.getItemCount());
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    onSearchChange?.('');
  }, [onSearchChange]);

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } finally {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" aria-label="Snack Villa home">
          <span className="logo-word logo-word-left">Snack</span>
          <span className="logo-emblem" aria-hidden="true">
            <span className="logo-emblem-inner">SV</span>
          </span>
          <span className="logo-word logo-word-right">Villa</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/menu" className="order-now-btn">
            Order Now
          </Link>

          <Link to="/cart" className="cart-icon" title="Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="signin-link">
                {user?.name ? user.name.split(' ')[0] : 'Profile'}
              </Link>
              <button type="button" className="signin-link signout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="signin-link">
              Sign In
            </Link>
          )}

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
