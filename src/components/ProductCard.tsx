import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductCard.css';
import type { Product } from '../types';
import { useAuthStore, useCartStore } from '../stores';
import { formatCurrency, getStarArray } from '../utils';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const addItem = useCartStore((state: any) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showAddedMessage, setShowAddedMessage] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      const redirectTarget = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectTarget)}`);
      return;
    }

    addItem(product, 1);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const stars = getStarArray(product.rating);

  return (
    <div
      className="product-card card"
      onClick={() => onProductClick?.(product)}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        {product.discount && (
          <div className="discount-badge">
            <span>{product.discount}% OFF</span>
          </div>
        )}
        {product.isNew && <div className="new-badge">NEW</div>}
        {product.isBestseller && (
          <div className="bestseller-badge">BESTSELLER</div>
        )}
      </div>

      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <div className="stars">
            {stars.map((filled: boolean, i: number) => (
              <span key={i} className={`star ${filled ? 'filled' : 'empty'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="product-footer">
          <div className="price-container">
            <span className="price">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            className={`btn btn-primary btn-small ${showAddedMessage ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {showAddedMessage ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
