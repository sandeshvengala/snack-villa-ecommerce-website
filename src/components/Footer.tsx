import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-container">
          <div className="footer-section brand-block">
            <div className="brand-logo" aria-label="Snack Villa logo">
              <span className="brand-name">SNACK</span>
              <span className="brand-badge">SV</span>
              <span className="brand-name">Villa</span>
            </div>
            <p>
              Bringing you fresh, global cuisine delivered right to your door.
              Every bowl tells a story of flavor, quality, and care.
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/snackvilla/" target="_blank" rel="noopener noreferrer" title="Instagram">ig</a>
              <a href="https://www.facebook.com/SnackVilla/" target="_blank" rel="noopener noreferrer" title="Facebook">fb</a>
              <a href="https://twitter.com/SnackVilla" target="_blank" rel="noopener noreferrer" title="Twitter">x</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">Locations</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about">Bulk Order</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Returns &amp; Refunds</a></li>
              <li><Link to="/about">Privacy Policy</Link></li>
              <li><Link to="/about">Terms</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>
              Snack Villa, Karimnagar-Sircilla Main Road
              <br />
              Near to collectorate Office
              <br />
              Sircilla 505301
            </p>
            <p>
              <a href="mailto:order@snackvilla.com">order@snackvilla.com</a>
              <br />
              <a href="mailto:grievance@snackvilla.com">grievance@snackvilla.com</a>
            </p>
            <p className="office-hours">
              Office Hours:
              <br />
              Monday - Friday (9:00 AM - 6:00 PM)
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Snack Villa. All rights reserved. Made with love for
            food lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
