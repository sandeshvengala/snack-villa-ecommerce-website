import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './index.css';
import './styles/index.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import {
  AboutPage,
  ContactPage,
  OrdersPage,
  NotFoundPage,
} from './pages/PlaceholderPages';
import { auth } from './lib/firebase';
import { useAuthStore } from './stores';
import { mapFirebaseUserToAppUser } from './utils/auth';

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  React.useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? mapFirebaseUserToAppUser(firebaseUser) : null);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/cart"
              element={(
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/checkout"
              element={(
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/order-confirmation/:orderId"
              element={(
                <ProtectedRoute>
                  <OrderConfirmationPage />
                </ProtectedRoute>
              )}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/orders"
              element={(
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
