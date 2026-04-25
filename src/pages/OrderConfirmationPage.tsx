import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderConfirmationPage.css';
import { formatCurrency, formatDeliveryTime } from '../utils';
import { useOrderStore } from '../stores';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const currentOrder = useOrderStore((state) => state.currentOrder);

  const order = React.useMemo(() => {
    if (orderId) {
      return getOrderById(orderId);
    }
    return currentOrder;
  }, [orderId, currentOrder, getOrderById]);

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="confirmation-card">
            <h1>Order not found</h1>
            <p>We could not find that order. Please check your order history.</p>
            <Link to="/orders" className="btn btn-primary">Go to My Orders</Link>
          </div>
        </div>
      </div>
    );
  }

  const deliveryFee = 50;
  const gst = Math.round(order.total * 0.05);
  const grandTotal = order.total + deliveryFee + gst;

  const deliveryTime = order.estimatedDelivery
    ? formatDeliveryTime(order.estimatedDelivery)
    : '30-45 mins';

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="success-header">
            <div className="success-icon">✓</div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your order. It will be delivered soon!</p>
          </div>

          <div className="order-info">
            <div className="order-id-section">
              <p className="label">Order ID</p>
              <p className="value">{order.id}</p>
            </div>

            <div className="delivery-time-section">
              <p className="label">Estimated Delivery</p>
              <p className="value">📍 {deliveryTime}</p>
              <p className="subtext">Your order is being prepared</p>
            </div>
          </div>

          <div className="order-items">
            <h2>Order Summary</h2>
            {order.items.map((item) => (
              <div key={item.id} className="item-row">
                <img src={item.product.image} alt={item.product.name} className="item-img" />
                <div className="item-info">
                  <p className="item-name">{item.product.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
              </div>
            ))}

            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              <div className="breakdown-row">
                <span>Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="breakdown-row">
                <span>GST</span>
                <span>{formatCurrency(gst)}</span>
              </div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="order-tracking">
            <h2>Order Status</h2>
            <div className="tracking-steps">
              <div className="step completed">
                <div className="step-icon">✓</div>
                <p className="step-label">Confirmed</p>
              </div>
              <div className="step-connector"></div>
              <div className="step active">
                <div className="step-icon">👨‍🍳</div>
                <p className="step-label">Preparing</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-icon">📦</div>
                <p className="step-label">Packed</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-icon">🚚</div>
                <p className="step-label">On the way</p>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-icon">🏠</div>
                <p className="step-label">Delivered</p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/menu" className="btn btn-outline btn-large">
              Order More
            </Link>
            <Link to="/orders" className="btn btn-primary btn-large">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
