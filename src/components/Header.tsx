import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import './Header.css';
import { auth } from '../lib/firebase';
import { useAuthStore, useCartStore } from '../stores';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
}

const DELIVERY_LOCATION_KEY = 'snackvilla.deliveryLocation';
const DEFAULT_DELIVERY_LOCATION = 'Sircilla, Telangana';

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const itemCount = useCartStore((state: any) => state.getItemCount());
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [deliveryLocation, setDeliveryLocation] = React.useState(() => {
    const savedLocation = localStorage.getItem(DELIVERY_LOCATION_KEY);
    return savedLocation || DEFAULT_DELIVERY_LOCATION;
  });

  React.useEffect(() => {
    onSearchChange?.('');
  }, [onSearchChange]);

  React.useEffect(() => {
    const handleStorageUpdate = (event: StorageEvent) => {
      if (event.key === DELIVERY_LOCATION_KEY) {
        setDeliveryLocation(event.newValue || DEFAULT_DELIVERY_LOCATION);
      }
    };

    const handleLocationChange = () => {
      const savedLocation = localStorage.getItem(DELIVERY_LOCATION_KEY);
      setDeliveryLocation(savedLocation || DEFAULT_DELIVERY_LOCATION);
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('snackvilla:location-updated', handleLocationChange);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('snackvilla:location-updated', handleLocationChange);
    };
  }, []);

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
          <Link
            to={isAuthenticated ? '/profile' : '/login'}
            className="mobile-account"
            title={isAuthenticated ? 'Account' : 'Sign In'}
            aria-label={isAuthenticated ? 'Account' : 'Sign In'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{isAuthenticated ? 'Account' : 'Sign In'}</span>
          </Link>

          <div className="header-tools" aria-label="Quick account tools">
            <button type="button" className="header-tool language-tool" aria-label="Language selector">
              <span className="tool-line-1" />
              <span className="tool-line-2">EN</span>
            </button>

            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="header-tool"
              title={isAuthenticated ? 'Account & Lists' : 'Sign In'}
            >
              <span className="tool-line-1">
                {isAuthenticated ? `Hello, ${user?.name ? user.name.split(' ')[0] : 'User'}` : 'Hello, sign in'}
              </span>
              <span className="tool-line-2">Account &amp; Lists</span>
            </Link>

            <Link to="/orders" className="header-tool" title="Returns & Orders">
              <span className="tool-line-1">Returns</span>
              <span className="tool-line-2">&amp; Orders</span>
            </Link>
          </div>

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
            <span className="cart-label">Cart</span>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
            )}
          </Link>

          {isAuthenticated && (
            <button type="button" className="signout-btn" onClick={handleLogout}>
              Logout
            </button>
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

      <Link to="/menu" className="mobile-delivery-strip" aria-label="Delivery location">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Deliver to {deliveryLocation}</span>
      </Link>
    </header>
  );
};

export default Header;
