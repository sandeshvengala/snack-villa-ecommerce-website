import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthStore } from '../stores';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } finally {
      logout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="profile-page">
      <div className="container profile-container">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your account and continue ordering your favorites.</p>

        <section className="profile-card card" aria-label="User profile details">
          <div className="profile-row">
            <span className="profile-label">Name</span>
            <span className="profile-value">{user?.name || 'Snack Villa User'}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user?.email || 'Not provided'}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Mobile</span>
            <span className="profile-value">{user?.phone || 'Not provided'}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">User ID</span>
            <span className="profile-value mono">{user?.id || '-'}</span>
          </div>
        </section>

        <section className="profile-actions card" aria-label="Quick profile actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link className="btn btn-outline" to="/menu">
              Continue Shopping
            </Link>
            <Link className="btn btn-outline" to="/cart">
              View Cart
            </Link>
            <Link className="btn btn-outline" to="/orders">
              My Orders
            </Link>
            <button className="btn btn-primary" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
