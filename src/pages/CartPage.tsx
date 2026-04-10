import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';
import { useAuthStore, useCartStore } from '../stores';
import { formatCurrency } from '../utils';

const CartPage: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const total = getTotal();
  const deliveryFee = items.length > 0 ? 50 : 0;
  const gst = Math.round(total * 0.05); // 5% GST
  const grandTotal = total + deliveryFee + gst;

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="empty-cart prelogin-empty-cart">
          <div className="prelogin-empty-illustration" aria-hidden="true">
            <svg viewBox="0 0 180 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="88" cy="90" rx="72" ry="14" fill="#E6EAEC" />
              <rect x="26" y="46" width="24" height="30" rx="4" fill="#B6CCD0" />
              <rect x="56" y="34" width="34" height="44" rx="5" fill="#7E8E93" />
              <rect x="97" y="42" width="40" height="32" rx="4" fill="#D1E0E4" />
              <rect x="105" y="49" width="24" height="18" rx="2" fill="#A8BDC2" />
              <circle cx="70" cy="82" r="7" fill="#9DB1B6" />
              <circle cx="116" cy="82" r="7" fill="#9DB1B6" />
            </svg>
          </div>
          <h2>Your Snack Villa Cart is empty</h2>
          <p>Sign in to see your items, offers, and faster checkout.</p>
          <div className="prelogin-cart-actions">
            <Link to="/login?redirect=%2Fcart" className="btn btn-primary">
              Sign in to your account
            </Link>
            <Link to="/login?redirect=%2Fcart&mode=signup" className="btn btn-outline">
              Sign up now
            </Link>
          </div>
          <Link to="/menu" className="prelogin-deals-link">
            Explore menu deals
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/menu" className="btn btn-primary btn-large">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span>{items.length} items in cart</span>
              <button className="clear-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>

            <div className="items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item card">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="item-image"
                  />

                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.description}</p>
                    <p className="price">
                      {formatCurrency(item.product.price)} each
                    </p>
                  </div>

                  <div className="item-quantity">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <p>{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="remove-btn"
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="fee">{formatCurrency(deliveryFee)}</span>
            </div>

            <div className="summary-row">
              <span>GST (5%)</span>
              <span>{formatCurrency(gst)}</span>
            </div>

            <div className="divider"></div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <div className="promo-section">
              <input
                type="text"
                placeholder="Promo code"
                className="promo-input"
              />
              <button className="btn btn-outline">Apply</button>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-large btn-full">
              Proceed to Checkout
            </Link>

            <Link to="/menu" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
