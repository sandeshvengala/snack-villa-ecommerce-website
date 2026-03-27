import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-script">we speak fluent sweets</div>

            <h1>
              NO MATTER WHICH SWEET CRAVING <span>it&apos;s for.</span>
            </h1>

            <p>
              Freshly made Indian homemade sweets. From laddu to kaju delights,
              authentic traditional flavours delivered fresh to your everyday.
            </p>

            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary btn-large hero-cta">
                Order Now <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="hero-points">
              <div className="hero-point">
                <span className="dot" />
                <span>Cooked to Order</span>
              </div>
              <div className="hero-point">
                <span className="dot" />
                <span>Menu Changes Weekly</span>
              </div>
              <div className="hero-point">
                <span className="dot" />
                <span>Everyday Pricing</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://s3-ap-southeast-1.amazonaws.com/foodvista.1/d6353cd1-843d-4469-a764-0823fe38fdfe.jpg"
              alt="Traditional Indian sweets served in bowls"
            />
            <div className="hero-stat hero-stat-left">
              <strong>7M+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="hero-stat hero-stat-right">
              <strong>4.1</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-overlay" aria-hidden="true">
              <div className="cta-bubble cta-bubble-top" />
              <div className="cta-bubble cta-bubble-bottom" />
              <div className="cta-bubble cta-bubble-center" />
            </div>

            <div className="cta-content">
              <h2>READY TO TASTE THE DIFFERENCE?</h2>
              <p>
                Join thousands who&apos;ve discovered that world-class flavours
                belong in your everyday.
              </p>
              <div className="cta-actions">
                <a
                  href="https://play.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-large"
                >
                  Download App
                </a>
                <Link to="/menu" className="btn btn-outline btn-large">
                  Order Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
