import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { useCartStore, useOrderStore, useAuthStore } from '../stores';
import { formatCurrency, generateOrderId, getDeliveryTime } from '../utils';
import type { Order, Address } from '../types';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder, setCurrentOrder } = useOrderStore();
  const { user } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'upi' | 'wallet' | 'cod' | null>(null);
  const [deliveryAddress, setDeliveryAddress] = React.useState<Address | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);
  const [showAddressForm, setShowAddressForm] = React.useState(!user);

  const total = getTotal();
  const deliveryFee = 50;
  const gst = Math.round(total * 0.05);
  const grandTotal = total + deliveryFee + gst;

  // Mock addresses
  const mockAddresses: Address[] = [
    {
      id: '1',
      type: 'home',
      street: '123 Main Street',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      street: '456 Business Park',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122010',
    },
  ];

  const handlePlaceOrder = () => {
    if (!deliveryAddress || !paymentMethod) {
      alert('Please select delivery address and payment method');
      return;
    }

    setIsPlacingOrder(true);

    // Simulate order processing
    setTimeout(() => {
      const order: Order = {
        id: generateOrderId(),
        userId: user?.id || 'guest-' + Date.now(),
        items,
        total,
        status: 'confirmed',
        createdAt: new Date(),
        estimatedDelivery: getDeliveryTime(),
        deliveryAddress,
        paymentMethod,
      };

      addOrder(order);
      setCurrentOrder(order);
      clearCart();
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${order.id}`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-state">
          <p>Your cart is empty. Add items to proceed.</p>
          <button
            onClick={() => navigate('/menu')}
            className="btn btn-primary"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-layout">
          {/* Main Checkout Form */}
          <div className="checkout-form">
            {/* Delivery Address Section */}
            <section className="form-section card">
              <h2>1. Delivery Address</h2>

              {!showAddressForm && mockAddresses.length > 0 ? (
                <>
                  <div className="address-list">
                    {mockAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`address-card ${deliveryAddress?.id === addr.id ? 'selected' : ''}`}
                        onClick={() => setDeliveryAddress(addr)}
                      >
                        <input
                          type="radio"
                          name="address"
                          title="Select delivery address"
                          checked={deliveryAddress?.id === addr.id}
                          onChange={() => setDeliveryAddress(addr)}
                        />
                        <div className="address-info">
                          <strong>
                            {addr.type.charAt(0).toUpperCase() + addr.type.slice(1)} · {addr.zipCode}
                          </strong>
                          <p>
                            {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowAddressForm(true)}
                  >
                    + Add New Address
                  </button>
                </>
              ) : (
                <div className="address-form">
                  <div className="form-group">
                    <label>Type</label>
                    <select className="form-input" title="Select address type">
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="City"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        placeholder="State"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="form-input"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method Section */}
            <section className="form-section card">
              <h2>2. Payment Method</h2>

              <div className="payment-options">
                {['card', 'upi', 'wallet', 'cod'].map((method) => (
                  <label
                    key={method}
                    className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value as 'card' | 'upi' | 'wallet' | 'cod'
                        )
                      }
                    />
                    <span className="payment-icon">
                      {method === 'card' && '💳'}
                      {method === 'upi' && '📱'}
                      {method === 'wallet' && '💰'}
                      {method === 'cod' && '🚚'}
                    </span>
                    <span className="payment-label">
                      {method === 'card' && 'Credit/Debit Card'}
                      {method === 'upi' && 'UPI'}
                      {method === 'wallet' && 'Digital Wallet'}
                      {method === 'cod' && 'Cash on Delivery'}
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-details">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="form-input"
                  />
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="payment-details">
                  <input
                    type="text"
                    placeholder="UPI ID (example@bank)"
                    className="form-input"
                  />
                </div>
              )}
            </section>

            {/* Order Items Review */}
            <section className="form-section card">
              <h2>3. Order Review</h2>
              <div className="items-summary">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary-sidebar card">
            <h2>Order Summary</h2>

            <div className="summary-items">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <span>{formatCurrency(gst)}</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="summary-row total">
              <span>Total Amount</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!deliveryAddress || !paymentMethod || isPlacingOrder}
              className={`btn btn-primary btn-large btn-full ${isPlacingOrder ? 'loading' : ''}`}
            >
              {isPlacingOrder ? '⏳ Placing Order...' : 'Place Order'}
            </button>

            <p className="security-note">🔒 Your payment is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
