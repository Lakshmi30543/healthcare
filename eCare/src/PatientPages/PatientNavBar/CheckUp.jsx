import React from 'react';
import axios from 'axios';
import config from '../../config'; // Same import path as in Appointment
import "../styles/checkup.css";

const checkupPackages = [
{ id: 1, name: "Basic Health Checkup", tests: "Blood, BP, Sugar", price: "₹499" },
  { id: 2, name: "Advanced Full Body Checkup", tests: "Liver, Kidney, Thyroid", price: "₹1999" },
  { id: 3, name: "Heart Checkup", tests: "ECG, Cholesterol, BP", price: "₹1499" },
  { id: 4, name: "Diabetes Package", tests: "HbA1c, Fasting Sugar", price: "₹899" },
  { id: 5, name: "Women's Wellness", tests: "Thyroid, CBC, Vitamin D", price: "₹1299" },
  { id: 6, name: "Men's Wellness", tests: "Prostate, Vitamin B12", price: "₹1299" },
  { id: 7, name: "Kidney Check", tests: "Creatinine, Urea", price: "₹999" },
  { id: 8, name: "Liver Function Test", tests: "SGPT, SGOT, Bilirubin", price: "₹1099" },
  { id: 9, name: "Thyroid Package", tests: "TSH, T3, T4", price: "₹599" },
  { id: 10, name: "Vitamin Deficiency", tests: "Vitamin D, B12", price: "₹699" },
  { id: 11, name: "Pre-Marital Checkup", tests: "CBC, HIV, Blood Group", price: "₹1599" },
  { id: 12, name: "Senior Citizen Checkup", tests: "BP, Sugar, Lipid Profile", price: "₹999" },
  { id: 13, name: "Child Health Screening", tests: "Growth, Immunity", price: "₹799" },
  { id: 14, name: "Fitness Check", tests: "BMI, CBC, ECG", price: "₹899" },
  { id: 15, name: "Executive Health Check", tests: "Full Panel Tests", price: "₹2499" },
];

export default function CheckUp() {
  const handleBookNow = async (pkg) => {
    try {
      // Convert price to number (remove ₹ and convert to paise)
      const amount = parseInt(pkg.price.replace('₹', '')) * 100;

      // Step 1: Create Razorpay order (using config.url like Appointment)
      const paymentRes = await axios.post(`${config.url}/eCare/payment/createOrder`, {
        amount: amount,
        packageId: pkg.id,
        packageName: pkg.name
      });

      if (!paymentRes.data || !paymentRes.data.id) {
        console.error("Payment API response invalid:", paymentRes.data);
        alert("Payment service is currently unavailable. Please try again later.");
        return;
      }

      const { id, amount: orderAmount, currency } = paymentRes.data;

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: "rzp_test_RefqIEzM75megk", // Same key as in Appointment
        amount: orderAmount,
        currency: currency,
        name: "eCare Health Services",
        description: pkg.name,
        order_id: id,
        handler: function(response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // You can add additional logic here like saving to database
        },
        prefill: {
          name: "Patient Name",
          email: "patient@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#39CABB" // Your teal color
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function(response) {
        alert("Payment Failed. Please try again.");
        console.error("Payment Failed:", response.error);
      });
      rzp.open();

    } catch (err) {
      console.error("Payment init failed:", err);
      alert("Something went wrong during payment. Please try again.");
    }
  };

  return (
    <section className="checkup-section">
      <h2 className="checkup-heading">Health Checkup Packages</h2>
      <div className="checkup-container">
        {checkupPackages.map((pkg) => (
          <div className="checkup-card" key={pkg.id}>
            <div className="checkup-icon">🩺</div>
            <h3>{pkg.name}</h3>
            <p>{pkg.tests}</p>
            <span className="price">{pkg.price}</span>
            <button 
              className="book-btn" 
              onClick={() => handleBookNow(pkg)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}