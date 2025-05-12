import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from '../config'; 
import "./styles/bloodservice.css";

export default function ApplyBlood() {
  const location = useLocation();
  const { bloodType, price } = location.state || { bloodType: "Unknown", price: "$0" };
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    
    try {
      const amount = parseInt(price.replace('$', '')) * 100;
      const paymentRes = await axios.post(`${config.url}/eCare/payment/createOrder`, {
        amount: amount,
        bloodType: bloodType,
        service: "Blood Donation"
      });

      if (!paymentRes.data?.id) {
        alert("Payment service unavailable. Please try later.");
        return;
      }

      const rzp = new window.Razorpay({
        key: "rzp_test_RefqIEzM75megk",
        amount: paymentRes.data.amount,
        currency: paymentRes.data.currency,
        name: "eCare Blood Services",
        description: `${bloodType} Blood Donation`,
        order_id: paymentRes.data.id,
        handler: (response) => {
          alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
        },
        prefill: { name, contact, email: "patient@example.com" },
        theme: { color: "#39CABB" }
      });

      rzp.on("payment.failed", (response) => {
        alert("Payment Failed. Please try again.");
        console.error("Payment Failed:", response.error);
      });
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="apply-blood-container">
      <h2>
        <span className="blood-icon">🩸</span> Apply for {bloodType} Blood
      </h2>
      <form onSubmit={handlePayment}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <input 
          type="tel" 
          placeholder="Contact Number" 
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required 
        />
        <div className="price-display">
          <p>Amount to Pay: {price}</p>
        </div>
        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
}
