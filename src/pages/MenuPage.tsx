import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './MenuPage.css';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('popular');
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);
  const [locationLabel, setLocationLabel] = React.useState('Sircilla, Telangana');
  const [showLocationDropdown, setShowLocationDropdown] = React.useState(false);
  const locationPickerRef = React.useRef<HTMLDivElement | null>(null);
  const filtersPopoverRef = React.useRef<HTMLDivElement | null>(null);

  const locations = [
    'Sircilla, Telangana',
    'Karimnagar, Telangana',
    'Siddipet, Telangana',
  ];

  React.useEffect(() => {
    if (!showLocationDropdown) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (locationPickerRef.current && !locationPickerRef.current.contains(target)) {
        setShowLocationDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showLocationDropdown]);

  React.useEffect(() => {
    if (!showAdvancedFilters) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (filtersPopoverRef.current && !filtersPopoverRef.current.contains(target)) {
        setShowAdvancedFilters(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAdvancedFilters(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showAdvancedFilters]);

  const selectedCategory = searchParams.get('category');
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0;
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 999;

  let filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const resetAllFilters = () => {
    setSearchQuery('');
    setSortBy('popular');
    setShowAdvancedFilters(false);
    setSearchParams({});
  };

  const togglePriceSort = () => {
    setSortBy((prev) => (prev === 'price-low' ? 'price-high' : 'price-low'));
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(() => {
      setLocationLabel('Current Location');
      setShowLocationDropdown(false);
    });
  };

  const isPriceSortActive = sortBy === 'price-low' || sortBy === 'price-high';

  return (
    <div className="menu-page">
      <section className="menu-hero-strip" aria-label="Menu hero section">
        <div className="menu-strip-inner menu-hero-content">
          <p className="menu-hero-script">freshly made, everyday</p>
          <h1>Snack Villa Menu</h1>
          <p className="menu-hero-subtitle">
            Pick your favorites from handcrafted sweets, snacks and comfort bites.
          </p>
        </div>
      </section>

      {/*
      <section className="menu-info-strip py-3 bg-muted border-b" aria-label="Menu offer strip">
        <div className="menu-strip-inner">
          <div className="location-strip-row">
            <div className="location-picker-wrap" ref={locationPickerRef}>
              <div
                className="location-card"
                role="button"
                tabIndex={0}
                onClick={() => setShowLocationDropdown((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowLocationDropdown((prev) => !prev);
                  }
                }}
              >
              <div className="location-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="location-icon" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="location-text-wrap">
                <p className="location-caption">Delivering to</p>
                <p className="location-value">{locationLabel}</p>
              </div>
              <span className="location-chevron" aria-hidden="true">▾</span>

              </div>

              <div
                className={`location-dropdown ${showLocationDropdown ? 'open' : 'closed'}`}
              >
                <div className="location-dropdown-header">
                  <h3>Select Your City</h3>
                </div>
                <div className="location-dropdown-list">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="location-dropdown-item"
                      onClick={() => {
                        setLocationLabel(location);
                        setShowLocationDropdown(false);
                      }}
                      tabIndex={showLocationDropdown ? 0 : -1}
                    >
                      <span>{location}</span>
                      {location === locationLabel && <span className="current-pill">Current</span>}
                    </button>
                  ))}
                </div>
                <div className="location-dropdown-footer">
                  <button onClick={handleLocateMe} tabIndex={showLocationDropdown ? 0 : -1}>Find Location</button>
                </div>
              </div>
            </div>

            <button className="locate-btn" onClick={handleLocateMe}>
              <span aria-hidden="true">➤</span>
              Locate Me
            </button>
          </div>
        </div>
      </section>
      */}

      <section className="menu-utility-strip py-4 border-b" aria-label="Menu controls strip">
        <div className="menu-strip-inner">
          <div className="quick-filters-row" ref={filtersPopoverRef}>
            {/*
            <div className="diet-button-group">
              <button
                className={`diet-btn ${dietFilter === 'veg' ? 'active veg' : ''}`}
                onClick={() => setDietFilter((prev) => (prev === 'veg' ? 'all' : 'veg'))}
              >
                <span className="diet-icon veg" aria-hidden="true">
                  <span className="diet-icon-inner" />
                </span>
                <span className="text-sm hidden-sm">Veg</span>
                <span className="text-sm show-sm">V</span>
              </button>

              <button
                className={`diet-btn ${dietFilter === 'non-veg' ? 'active non-veg' : ''}`}
                onClick={() => setDietFilter((prev) => (prev === 'non-veg' ? 'all' : 'non-veg'))}
              >
                <span className="diet-icon non-veg" aria-hidden="true">▲</span>
                <span className="text-sm hidden-sm">Non-Veg</span>
                <span className="text-sm show-sm">NV</span>
              </button>
            </div>
            */}

            <button className={`quick-action-btn price-btn ${isPriceSortActive ? 'active' : ''}`} onClick={togglePriceSort}>
              <span className="hidden-sm">Price</span>
              <span className="show-sm">Sort</span>
              <span aria-hidden="true" className="price-arrow">{sortBy === 'price-high' ? '↓' : '↑'}</span>
            </button>

            <button
              className={`quick-action-btn ${showAdvancedFilters ? 'active' : ''}`}
              type="button"
              aria-haspopup="dialog"
              aria-controls="radix-filters"
              data-state={showAdvancedFilters ? 'open' : 'closed'}
              onClick={() => setShowAdvancedFilters((prev) => !prev)}
            >
              <span aria-hidden="true">⌯</span>
              <span>Filters</span>
            </button>

            <button className="quick-action-btn" onClick={resetAllFilters}>
              Reset All
            </button>
          </div>

          {showAdvancedFilters && (
            <div
              id="radix-filters"
              className="filters-popover z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none"
            >
              <h3 className="filters-title">Filters</h3>
              <div className="search-sort-bar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  title="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="sort-box">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="price-box">
                <label htmlFor="max-price">Max price: ₹{maxPrice}</label>
                <input
                  id="max-price"
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  title="Select maximum price"
                  onChange={(e) =>
                    setSearchParams({
                      ...(selectedCategory && { category: selectedCategory }),
                      maxPrice: e.target.value,
                    })
                  }
                  className="price-slider"
                />
              </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/*
      Category list kept in comments as requested:
      - All Categories
      - Laddus / Sweet Balls
      - Sweets (General)
      - Spicy Snacks (Namkeen)
      - Chips & Crispy Items
      - Traditional / Homemade Specials
      - Combo Packs
      */}

      <main id="menu-container" className="menu-container py-8">
        <div className="menu-content">
          <div className="results-header">
            <h2>
              {selectedCategory ? `${selectedCategory}` : 'All Products'} ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
              <button className="btn btn-primary" onClick={resetAllFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
