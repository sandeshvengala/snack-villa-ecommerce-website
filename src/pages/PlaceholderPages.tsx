import React from 'react';
import { Link } from 'react-router-dom';
import './PlaceholderPages.css';

export const AboutPage: React.FC = () => (
  <div className="placeholder-page">
    <div className="container">
      <h1>About Snack Villa</h1>
      <div className="content">
        <p>
          Welcome to Snack Villa, your favorite destination for premium snacks and sweets delivered fresh to your doorstep.
        </p>
        <h2>Our Mission</h2>
        <p>
          We believe that great snacking experiences should be accessible to everyone. Our mission is to deliver the freshest, highest-quality treats right to your door.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🎯 Fresh ingredients sourced daily</li>
          <li>⚡ Quick 30-minute delivery</li>
          <li>💰 Competitive pricing</li>
          <li>🛡️ 100% Quality guaranteed</li>
        </ul>
      </div>
    </div>
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="placeholder-page">
    <div className="container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={5}></textarea>
            <button className="btn btn-primary">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>📧 Email: info@snackvilla.com</p>
          <p>📱 Phone: +91 98765 43210</p>
          <p>📍 Address: 123 Sweet Street, Food City, FC 100001</p>
          <p>⏰ Hours: Mon-Sun 9:00 AM - 11:00 PM</p>
        </div>
      </div>
    </div>
  </div>
);

export const ProfilePage: React.FC = () => (
  <div className="placeholder-page">
    <div className="container">
      <h1>My Profile</h1>
      <div className="profile-content">
        <p>👤 User Profile Page</p>
        <p>Please sign in to view your profile, orders, and preferences.</p>
        <Link to="/login" className="btn btn-primary">Sign In</Link>
      </div>
    </div>
  </div>
);

export const OrdersPage: React.FC = () => (
  <div className="placeholder-page">
    <div className="container">
      <h1>My Orders</h1>
      <div className="orders-content">
        <p>📋 Track all your orders here</p>
        <p>View order history, delivery status, and reorder your favorites.</p>
      </div>
    </div>
  </div>
);

export const NotFoundPage: React.FC = () => (
  <div className="placeholder-page">
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <div className="content">
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  </div>
);
