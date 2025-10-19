import React from 'react';
// Corrected the import path to let the build tool resolve the file extension
import { products, services } from '../ProductData'; 

// --- Reusable SVG Icons ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);


// --- Main Customer Home Page Component ---
function CustomerHomePage({ onLogout }) {
  return (
    <div className="customer-page">
      <header className="customer-header">
        <div className="header-greeting">
          <h2>Hi Wilson!</h2>
          <p>Enjoy our services!</p>
        </div>
        <div className="header-profile-icon">
          <img src="https://placehold.co/40x40/E9F2EB/2E7D32?text=W" alt="User Profile" />
        </div>
      </header>

      <main className="customer-main-content">
        {/* --- Search Bar --- */}
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
          <button className="filter-button">
            <FilterIcon />
          </button>
        </div>

        {/* --- Free Consultation Card --- */}
        <div className="consultation-card">
          <div className="consultation-text">
            <h3>Free Consultation</h3>
            <p>Get free support from our customer service</p>
            <button className="call-now-button">Call Now</button>
          </div>
          <div className="consultation-image">
             <svg width="80" height="80" viewBox="0 0 24 24" fill="#2E7D32"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
        </div>

        {/* --- Featured Products Section --- */}
        <div className="section">
          <div className="section-header">
            <h3>Featured Products</h3>
            <a href="#" className="see-all-link">See All</a>
          </div>
          <div className="featured-products-grid">
            {products.slice(0, 4).map(product => (
              <div key={product.id} className="featured-product-card">
                <img src={product.image} alt={product.name} />
                <div className="featured-product-info">
                  <p className="featured-product-name">{product.name}</p>
                  <div className="featured-product-details">
                    <span className="featured-product-price">₹{product.price}/{product.unit}</span>
                    <button className="featured-product-add-button"><PlusIcon/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Services Section --- */}
        <div className="section">
           <div className="section-header">
            <h3>Services</h3>
          </div>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.name} className="service-card">
                <img src={service.image} alt={service.name} />
                <div className="service-name-overlay">{service.name}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- Bottom Navigation Bar --- */}
      <footer className="bottom-nav">
        <button className="nav-item active">Home</button>
        <button className="nav-item">Services</button>
        <button className="nav-item">Cart</button>
        <button className="nav-item">Profile</button>
        <button onClick={onLogout} className="nav-item">Logout</button>
      </footer>
    </div>
  );
}

export default CustomerHomePage;

