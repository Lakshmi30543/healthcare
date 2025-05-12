import React from 'react';
import '../styles/contact.css';

export default function Contact() {
  return (
    <div className="health-contact-container">
      <header className="health-contact-header">
        <h1 className="health-contact-title">Contact Our Clinic</h1>
        <p className="health-contact-subtitle">We're here to help with all your healthcare needs</p>
      </header>
      
      <div className="health-contact-content">
        <div className="health-contact-info">
          <div className="health-contact-card">
            <div className="health-contact-icon">📞</div>
            <h3>Phone</h3>
            <p>Main: 7934893489</p>
            <p>Emergency: 9235434643</p>
          </div>
          
          <div className="health-contact-card">
            <div className="health-contact-icon">✉️</div>
            <h3>Email</h3>
            <p>eCare@gmail.com</p>
            <p>eCaresupport@healthcare.com</p>
          </div>
          
          <div className="health-contact-card">
            <div className="health-contact-icon">🏥</div>
            <h3>Location</h3>
            <p>123 Medical Center Drive</p>
            <p>Hyderabad, TX 75001</p>
          </div>
        </div>
        
        <form className="health-contact-form">
          <h3>Send Us a Message</h3>
          
          <div className="health-form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>
          
          <div className="health-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="john@example.com" />
          </div>
          
          <div className="health-form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" placeholder="(555) 555-5555" />
          </div>
          
          <div className="health-form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject">
              <option value="">Select a subject</option>
              <option value="appointment">Appointment Inquiry</option>
              <option value="billing">Billing Question</option>
              <option value="prescription">Prescription Refill</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="health-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your message..."></textarea>
          </div>
          
          <button type="submit" className="health-contact-button">
            Send Message
          </button>
        </form>
      </div>
      
      <div className="health-contact-hours">
        <h3>Clinic Hours</h3>
        <ul>
          <li><span>Monday-Friday:</span> 8:00 AM - 6:00 PM</li>
          <li><span>Saturday:</span> 9:00 AM - 2:00 PM</li>
          <li><span>Sunday:</span> Closed</li>
        </ul>
      </div>
      
      
    </div>
  );
}