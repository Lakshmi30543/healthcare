import React from "react";
import axios from "axios";
import config from "../../config";
import typhoid from "../../assets/images/typhoid.jpeg";
import rabies from "../../assets/images/rabies.jpeg";
import dpt from "../../assets/images/dpt.jpeg";
import rotavirus from "../../assets/images/rotavirus.jpeg";
import encephalitis from "../../assets/images/encephalitis.jpeg";
import varicella from "../../assets/images/varicella.jpeg";
import yellowFever from "../../assets/images/yellowFever.jpeg";
import cholera from "../../assets/images/cholera.jpeg";
import dengue from "../../assets/images/dengue.jpeg";
import "../styles/vacination.css";

const vaccinationData = [
  { id: 1, title: "Typhoid Shield Vaccine", image: typhoid, price: "₹2,000" },
  { id: 2, title: "Rabies Pre-Exposure Prophylaxis", image: rabies, price: "₹3,500" },
  { id: 3, title: "DTP (Diphtheria, Tetanus, Pertussis)", image: dpt, price: "₹1,800" },
  { id: 4, title: "Rotavirus Immunization", image: rotavirus, price: "₹2,400" },
  { id: 5, title: "Japanese Encephalitis Vaccine", image: encephalitis, price: "₹3,800" },
  { id: 6, title: "Varicella(Chickenpox)Vaccine", image: varicella, price: "₹2,500" },
  { id: 7, title: "Yellow Fever Vaccine", image: yellowFever, price: "₹3,200" },
  { id: 8, title: "Cholera Protection Shot", image: cholera, price: "₹2,100" },
  { id: 9, title: "Dengue Vaccine", image: dengue, price: "₹4,000" },
];

export default function Vaccination() {
  const handleBookVaccine = async (vaccine) => {
    try {
      // Convert price to number (remove ₹ and commas, then convert to paise)
      const amount = parseInt(vaccine.price.replace(/[₹,]/g, '')) * 100;

      // Step 1: Create Razorpay order
      const paymentRes = await axios.post(`${config.url}/eCare/payment/createOrder`, {
        amount: amount,
        vaccineId: vaccine.id,
        vaccineName: vaccine.title
      });

      if (!paymentRes.data || !paymentRes.data.id) {
        console.error("Payment API response invalid:", paymentRes.data);
        alert("Payment service is currently unavailable. Please try again later.");
        return;
      }

      const { id, amount: orderAmount, currency } = paymentRes.data;

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: "rzp_test_RefqIEzM75megk", // Same key as in other components
        amount: orderAmount,
        currency: currency,
        name: "eCare Vaccination Services",
        description: vaccine.title,
        order_id: id,
        handler: function(response) {
          alert(`Payment successful! Your vaccine booking ID: ${response.razorpay_payment_id}`);
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
    <div className="vaccination-container">
      <h2 className="vaccination-title">Vaccination Packages</h2>
      <div className="vaccination-grid">
        {vaccinationData.map((vaccine, index) => (
          <div key={vaccine.id} className="vaccine-card">
            <img src={vaccine.image} alt={vaccine.title} className="vaccine-image" />
            <h3 className="vaccine-title">{vaccine.title}</h3>
            <p className="vaccine-price">{vaccine.price}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleBookVaccine(vaccine)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}