import React, { useState } from 'react';

export default function App() {
  // ----------------------------------------------------
  // STATE MANAGEMENT
  // ----------------------------------------------------

  // Search Bar & Text Counter State
  const [searchText, setSearchText] = useState('');

  // Helper text calculation variables
  const characterCount = searchText.length;
  const wordCount = searchText.trim() === '' ? 0 : searchText.trim().split(/\s+/).length;

  // Product Quantity Selector State
  const [quantities, setQuantities] = useState([1, 1, 1, 1, 1, 1]);

  // Product Data
  const products = [
    { id: 1, name: 'Milk', price: 50, icon: '🥛', desc: 'Fresh Dairy Milk (1L)' },
    { id: 2, name: 'Bread', price: 40, icon: '🍞', desc: 'Whole Wheat Brown Bread' },
    { id: 3, name: 'Eggs', price: 70, icon: '🥚', desc: 'Farm Fresh Eggs (6 pcs)' },
    { id: 4, name: 'Apple', price: 120, icon: '🍎', desc: 'Crispy Kashmiri Apples (1kg)' },
    { id: 5, name: 'Rice', price: 90, icon: '🌾', desc: 'Premium Basmati Rice (1kg)' },
    { id: 6, name: 'Banana', price: 50, icon: '🍌', desc: 'Ripe Robusta Bananas (1 Dozen)' },
  ];

  // Handler to update individual product quantity
  const handleQuantityChange = (index, operation) => {
    const updatedQuantities = [...quantities];
    if (operation === 'increment') {
      updatedQuantities[index] += 1;
    } else if (operation === 'decrement' && updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
    }
    setQuantities(updatedQuantities);
  };

  // Grand Total calculation
  const grandTotal = products.reduce((sum, item, index) => {
    return sum + item.price * quantities[index];
  }, 0);

  // Theme State
  const [theme, setTheme] = useState('green');

  // Delivery Partner Profiles
  const profiles = {
    Rahul: { name: 'Rahul Sharma', avatar: '👨', role: 'Delivery Partner', city: 'Pune' },
    Priya: { name: 'Priya Patel', avatar: '👩', role: 'Fleet Captain', city: 'Mumbai' },
    Aman: { name: 'Aman Verma', avatar: '🚴', role: 'Express Rider', city: 'Delhi' }
  };
  const [currentProfile, setCurrentProfile] = useState('Rahul');

  // Feedback Collector State
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0);

  const handleFeedback = (type) => {
    setSelectedFeedback(type);
    setFeedbackCount(prev => prev + 1);
  };

  return (
    <div className={`app-container theme-${theme}`}>
      
      {/* --------------------------------------------------
          NAVBAR SECTION
          -------------------------------------------------- */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">🛒 QuickCart</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#profiles">Riders</a></li>
            <li><a href="#feedback">Feedback</a></li>
          </ul>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* --------------------------------------------------
          HERO SECTION
          -------------------------------------------------- */}
      <header id="home" className="hero-section">
        <div className="hero-content">
          <h1>Fresh Groceries Delivered in Minutes</h1>
          <p className="subheading">Order fruits, vegetables, dairy and daily essentials with lightning-fast delivery.</p>
          
          <div className="search-box-wrapper">
            <input 
              type="text" 
              placeholder="Search for items, brands, and categories..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-bar"
            />
            
            {/* Live Character & Word Counter Card */}
            <div className="counter-card">
              <div className="counter-stats">
                <p>Characters Typed: <strong>{characterCount}</strong></p>
                <p>Words Typed: <strong>{wordCount}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------
          THEME PICKER SECTION
          -------------------------------------------------- */}
      <section className="section theme-picker-section">
        <div className="card theme-card">
          <h2>Choose Theme</h2>
          <p className="theme-status">Selected Theme: <span className="theme-text-highlight">{theme.toUpperCase()}</span></p>
          <div className="theme-buttons-container">
            <button className="theme-btn btn-red" onClick={() => setTheme('red')}>🔴 Red</button>
            <button className="theme-btn btn-green" onClick={() => setTheme('green')}>🟢 Green</button>
            <button className="theme-btn btn-blue" onClick={() => setTheme('blue')}>🔵 Blue</button>
            <button className="theme-btn btn-yellow" onClick={() => setTheme('yellow')}>🟡 Yellow</button>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          PRODUCT SECTION
          -------------------------------------------------- */}
      <section id="products" className="section products-section">
        <div className="section-header">
          <h2>Our Fresh Products</h2>
        </div>

        <div className="products-grid">
          {products.map((product, index) => {
            const quantity = quantities[index];
            const itemTotal = product.price * quantity;

            return (
              <div key={product.id} className="product-card">
                <div className="product-icon">{product.icon}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <p className="product-price">₹{product.price}</p>
                
                <div className="quantity-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => handleQuantityChange(index, 'decrement')}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => handleQuantityChange(index, 'increment')}
                  >
                    +
                  </button>
                </div>

                <div className="item-total-display">
                  <span>Total: ₹{itemTotal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Checkout Summary */}
        <div className="cart-summary-card">
          <h3>Grand Total Summary</h3>
          <p className="grand-total-amount">Grand Total: ₹{grandTotal}</p>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </section>

      {/* --------------------------------------------------
          DELIVERY PARTNER SECTION
          -------------------------------------------------- */}
      <section id="profiles" className="section delivery-section">
        <div className="card profile-container-card">
          <h2>Your Delivery Superheroes</h2>
          
          <div className="profile-toggle-buttons">
            <button 
              className={`profile-toggle ${currentProfile === 'Rahul' ? 'active' : ''}`}
              onClick={() => setCurrentProfile('Rahul')}
            >
              Rahul
            </button>
            <button 
              className={`profile-toggle ${currentProfile === 'Priya' ? 'active' : ''}`}
              onClick={() => setCurrentProfile('Priya')}
            >
              Priya
            </button>
            <button 
              className={`profile-toggle ${currentProfile === 'Aman' ? 'active' : ''}`}
              onClick={() => setCurrentProfile('Aman')}
            >
              Aman
            </button>
          </div>

          {/* Profile Card Output Display */}
          <div className="profile-display-card">
            <div className="profile-avatar">{profiles[currentProfile].avatar}</div>
            <div className="profile-details">
              <h3>{profiles[currentProfile].name}</h3>
              <p className="profile-role">{profiles[currentProfile].role}</p>
              <p className="profile-city">📍 {profiles[currentProfile].city}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          FEEDBACK SECTION
          -------------------------------------------------- */}
      <section id="feedback" className="section feedback-section">
        <div className="card feedback-card">
          <h2>How was your experience?</h2>
          
          <div className="feedback-buttons">
            <button className="feedback-btn" onClick={() => handleFeedback('good')}>😊 Good</button>
            <button className="feedback-btn" onClick={() => handleFeedback('average')}>😐 Average</button>
            <button className="feedback-btn" onClick={() => handleFeedback('poor')}>☹️ Poor</button>
          </div>

          {/* Feedback response context */}
          {selectedFeedback && (
            <div className="feedback-response-box">
              {selectedFeedback === 'good' && <p className="fb-msg msg-good">Thank you for your positive feedback ❤️</p>}
              {selectedFeedback === 'average' && <p className="fb-msg msg-average">We'll improve our service 🙂</p>}
              {selectedFeedback === 'poor' && <p className="fb-msg msg-poor">Sorry for the inconvenience 😔</p>}
            </div>
          )}

          <div className="feedback-counter-badge">
            Total Feedback Submitted: <strong>{feedbackCount}</strong>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          FOOTER SECTION
          -------------------------------------------------- */}
      <footer className="footer">
        <p>&copy; 2026 QuickCart. All Rights Reserved.</p>
        <p className="footer-sub">Made with pure React <code>useState</code></p>
      </footer>

    </div>
  );
}