import React, { useState } from 'react';
import { ethers } from "ethers";

const Buy = ({ state }) => {
  // 1. Add state for loading and hover
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = event.target.name.value;
    const message = event.target.message.value;
    const amount = { value: ethers.parseEther("0.001") };

    try {
      setLoading(true); // Disable button immediately
      const txn = await contract.buyChai(name, message, amount);
      
      console.log("Transaction sent... waiting for confirmation");
      await txn.wait();
      
      alert("Thank you for buying a chai!");
      
      // Instead of reload, you could call a function to refresh memos here
      window.location.reload(); 
    } catch (error) {
      console.error("Error buying chai:", error);
      alert("Transaction failed or was cancelled.");
    } finally {
      setLoading(false); // Re-enable button if transaction fails/finishes
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#0f172a' 
    }}>
      <form 
        onSubmit={buyChai} 
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: '#1e293b', 
          padding: '2.5rem',
          borderRadius: '1rem',
          border: '1px solid #334155', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        }}
      >
        <h2 style={{
          color: '#34d399', 
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Buy me a Chai
        </h2>

        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor='name' style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            Name
          </label>
          <input 
            type="text" placeholder="Enter Your Name" id="name" required 
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', color: '#f8fafc', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label htmlFor='message' style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
            Message
          </label>
          <input 
            type="text" placeholder="Enter Your Message" id="message" required 
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '0.5rem', color: '#f8fafc', outline: 'none', boxSizing: 'border-box', marginBottom: '-0.2rem' }}
          />
        </div>

        {/* 2. Dynamic Button Logic */}
        <button 
          type="submit" 
          disabled={loading || !state.contract} // Disable if loading OR contract isn't loaded
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '100%',
            padding: '0.875rem',
            // Color changes based on Loading -> Hover -> Default
            backgroundColor: loading ? '#475569' : (isHovered ? '#059669' : '#10b981'),
            color: loading ? '#94a3b8' : '#ffffff',
            fontWeight: '700',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '1rem',
            opacity: loading ? 0.7 : 1,
            transform: !loading && isHovered ? 'scale(1.02)' : 'scale(1)'
          }}
        >
          {loading ? "Transaction in Progress..." : "Buy Chai for 0.001 ETH"}
        </button>
      </form>
    </div>
  );
}

export default Buy;