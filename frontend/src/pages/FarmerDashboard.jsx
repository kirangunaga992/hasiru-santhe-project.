import React, { useState } from 'react';
// Sariyada import path ge '.js' extension tegeyalagide
import { functions } from '../firebase'; 
import { httpsCallable } from "firebase/functions";

// This is the main dashboard for the farmer after logging in.
function FarmerDashboard({ farmerId, onLogout }) {
  // State for manual product form
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // State for voice product form
  const [voiceText, setVoiceText] = useState('ಟೊಮೆಟೊ 10 ಕೆಜಿ 25 ರೂಪಾಯಿ');
  
  // General state
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Handler for Manual Product Creation ---
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!productName || !price || !quantity) {
      setMessage('Please fill all product fields.');
      return;
    }
    setIsLoading(true);
    setMessage('Listing product...');
    
    try {
      const createProductFn = httpsCallable(functions, 'createProduct');
      const result = await createProductFn({ 
        name: productName, 
        price: price, 
        quantity: quantity, 
        farmerId 
      });
      setMessage(result.data.message);
      // Clear form on success
      setProductName('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handler for Voice Text Product Creation ---
  const handleCreateFromVoice = async () => {
    if (!voiceText) {
      setMessage('Please enter the text from the voice command.');
      return;
    }
    setIsLoading(true);
    setMessage('Processing voice text...');

    try {
      const createProductFromVoiceTextFn = httpsCallable(functions, 'createProductFromVoiceText');
      const result = await createProductFromVoiceTextFn({ text: voiceText, farmerId });
      setMessage(result.data.message);
    } catch (error) {
      console.error("Error creating product from voice:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Farmer Dashboard</h1>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </header>
      <main className="dashboard-content">
        <p className="welcome-message">Welcome, Farmer <strong>{farmerId}</strong>! List your products below.</p>
        
        {/* --- Manual Product Form --- */}
        <div className="form-card">
          <h3>List a New Product Manually</h3>
          <form onSubmit={handleCreateProduct} className="form-grid">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name (e.g., Tomato)"
              disabled={isLoading}
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price (in Rupees)"
              disabled={isLoading}
            />
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity (e.g., 10 kg)"
              disabled={isLoading}
            />
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Listing...' : 'List Product'}
            </button>
          </form>
        </div>

        {/* --- Voice Product Form --- */}
        <div className="form-card">
          <h3>List a Product from Voice (Test)</h3>
          <p className="card-subtitle">This simulates the text received from the AI after you speak.</p>
          <div className="form-grid">
            <input
              type="text"
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              placeholder="Voice text"
              disabled={isLoading}
            />
            <button onClick={handleCreateFromVoice} className="submit-button" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Create from Voice Text'}
            </button>
          </div>
        </div>

        {message && <p className="status-message">{message}</p>}
      </main>
    </div>
  );
}

export default FarmerDashboard;

