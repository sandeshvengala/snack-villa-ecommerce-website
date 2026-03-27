import React from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';
import { useCartStore } from '../stores';
import { formatCurrency } from '../utils';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const total = getTotal();
  const deliveryFee = items.length > 0 ? 50 : 0;
  const gst = Math.round(total * 0.05); // 5% GST
  const grandTotal = total + deliveryFee + gst;

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
