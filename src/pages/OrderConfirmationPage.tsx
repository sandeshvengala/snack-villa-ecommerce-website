import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderConfirmationPage.css';
import { formatCurrency, formatDeliveryTime } from '../utils';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order] = React.useState(() => {
    // In real app, fetch from store/API
    return {
      id: orderId || 'ORD-1234567890',
      status: 'confirmed' as const,
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 30 * 60000),
      items: [
        {
          id: '1',
          product: {
            id: 'donut-1',
            name: 'Glazed Chocolate Donut',
            price: 49,
            image: 'https://images.unsplash.com/photo-1585080872051-9d70bc05e603?w=100&h=100&fit=crop',
            category: 'Donuts',
            rating: 4.8,
            reviews: 100,
            tags: [],
            description: 'Rich chocolate donut',
          },
          quantity: 2,
        },
      ],
      total: 98,
      deliveryFee: 50,
      gst: 7,
      grandTotal: 155,
    };
  });

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
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
              <div className="breakdown-row">
                <span>GST</span>
                <span>{formatCurrency(order.gst)}</span>
              </div>
              <div className="breakdown-row total">
                <span>Total</span>
                <span>{formatCurrency(order.grandTotal)}</span>
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

          <div className="what-next">
            <h3>What's Next?</h3>
            <ul>
              <li>📱 You'll receive SMS updates on your order status</li>
              <li>💬 Chat with our support if you have any questions</li>
              <li>⏰ Track your order in real-time</li>
            </ul>
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
