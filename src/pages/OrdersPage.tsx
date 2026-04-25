import React from 'react';
import { Link } from 'react-router-dom';
import './OrdersPage.css';
import { useOrderStore } from '../stores';
import { formatCurrency, formatDeliveryTime } from '../utils';

const statusEmoji: Record<string, string> = {
  pending: '🕒',
  confirmed: '✅',
  preparing: '👨‍🍳',
  'on-the-way': '🚚',
  delivered: '📦',
};

const OrdersPage: React.FC = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="orders-page container">
        <h1>My Orders</h1>
        <div className="orders-empty card">
          <p>You have not placed any orders yet.</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container">
      <h1>My Orders</h1>
      <p className="orders-subtitle">Track your recent snack and sweet deliveries.</p>

      <div className="orders-list">
        {orders.map((order) => {
          const deliveryFee = 50;
          const gst = Math.round(order.total * 0.05);
          const grandTotal = order.total + deliveryFee + gst;

          return (
            <article key={order.id} className="order-card card">
              <div className="order-top-row">
                <div>
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-date">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="status-pill">
                  {statusEmoji[order.status]} {order.status.replace('-', ' ')}
                </span>
              </div>

              <div className="order-items-preview">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="preview-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <span>{item.product.name} × {item.quantity}</span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <p className="more-items">+{order.items.length - 3} more items</p>
                )}
              </div>

              <div className="order-meta-row">
                <p>
                  <strong>Total:</strong> {formatCurrency(grandTotal)}
                </p>
                <p>
                  <strong>ETA:</strong>{' '}
                  {order.estimatedDelivery ? formatDeliveryTime(order.estimatedDelivery) : 'Updating soon'}
                </p>
              </div>

              <div className="order-actions">
                <Link to={`/order-confirmation/${order.id}`} className="btn btn-outline">
                  View Details
                </Link>
                <Link to="/menu" className="btn btn-primary">
                  Reorder
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
