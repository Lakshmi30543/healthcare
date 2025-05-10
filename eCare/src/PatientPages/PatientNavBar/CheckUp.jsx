import React from 'react';
import axios from 'axios';
import config from '../../config';
import "../styles/checkup.css";

const checkupPackages = [
  { id: 1, name: "Basic Health Checkup",  price: "₹499", image: "https://kdahweb-static.kokilabenhospital.com/kdah-2019/shop/package/images/16225515070.jpg" },
  { id: 2, name: "Full Body Checkup",price: "₹1999", image: "https://www.indushealthplus.com/front/media/package_img/thumbnail_image/1732600980_comprehensive-full-body-checkup.jpg" },
  { id: 3, name: "Heart Checkup", price: "₹1499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV7IFlkr9DvYjNBuMWMiIAwkBfuzqdtz3Uog&s" },
  { id: 4, name: "Diabetes Package", price: "₹899", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6_WOluyffort5n0SGFNnLiJA8WZ0AFQHug&s" },
  { id: 5, name: "Women's Wellness",  price: "₹1299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHLyjtPyly35qC0cCuhmfreVPIU6gZeujQ7A&s" },
  { id: 6, name: "Men's Wellness",  price: "₹1299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5VO6e5iPBYZ_wr6UgoE98baoZEKH__9ZTw&s" },
  { id: 7, name: "Kidney Check", price: "₹999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4MA2a-HTRDHigkThFQGAJUIXBMx9bt_6d3w&s" },
  { id: 8, name: "Liver Function Test", tests: "SGPT, SGOT, Bilirubin", price: "₹1099", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9Ugn71ldOG-ubocOV4fAXbnVmrz5ozQnmw&s" },
  { id: 9, name: "Thyroid Package",  price: "₹599", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpG7WdJBB732JfKprMBvVg8Sn_egWcdgEjtg&s" },
  { id: 10, name: "Vitamin Deficiency",price: "₹699", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFD9OeDBGtz87sAasyDgtA4txSjW0hw813g&s" },
  { id: 11, name: "Pre-Marital Checkup", price: "₹1599", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgd4Pojakt6iMOsj8VtkANFMlouQXOMH5Pg&s" },
  { id: 12, name: "Senior Citizen Checkup",  price: "₹999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFF06N4ycP6hjVXuYlgj5ReEuU9igOuXw3cA&s" },
  { id: 13, name: "Child Health Screening", price: "₹799", image: "https://www.birlahospital.com/wp-content/uploads/2021/10/Birlas-Child-Health-Checkup.jpg" },
  { id: 14, name: "Fitness Check", price: "₹899", image: "https://jflowershealth.com/wp-content/uploads/2020/09/iStock-1172191646.jpg" },
  { id: 15, name: "Executive Health Check",  price: "₹2499", image: "https://tulsihospital.com/wp-content/uploads/2021/05/Health-Checkup.jpg" },
];

export default function CheckUp() {
  const handleBookNow = async (pkg) => {
    try {
      const amount = parseInt(pkg.price.replace('₹', '')) * 100;

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

      const options = {
        key: "rzp_test_RefqIEzM75megk",
        amount: orderAmount,
        currency: currency,
        name: "eCare Health Services",
        description: pkg.name,
        order_id: id,
        handler: function(response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: "Patient Name",
          email: "patient@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#39CABB"
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
            <img src={pkg.image} alt={pkg.name} className="checkup-image" />
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