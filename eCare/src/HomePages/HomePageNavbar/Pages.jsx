import React from 'react';
import '../styles/pages.css';

export default function Pages() {
  return (
    <div className="health-pages-container">
      <header className="health-pages-header">
        <h1 className="health-pages-title">Appointment Dashboard</h1>
        <p className="health-pages-subtitle">Manage your healthcare appointments</p>
      </header>
      
      <div className="health-pages-content">
        <div className="health-pages-card">
          <div className="health-pages-card-icon">🩺</div>
          <h3>Book Appointment</h3>
          <p>Schedule with your doctor or specialist</p>
          <button className="health-pages-button">Schedule Now</button>
        </div>
        
        <div className="health-pages-card">
          <div className="health-pages-card-icon">📅</div>
          <h3>Upcoming Visits</h3>
          <p>View and manage your appointments</p>
          <button className="health-pages-button">View Calendar</button>
        </div>
        
        <div className="health-pages-card">
          <div className="health-pages-card-icon">🏥</div>
          <h3>Find Clinics</h3>
          <p>Locate nearby healthcare facilities</p>
          <button className="health-pages-button">Search Locations</button>
        </div>

        <div className="health-pages-card">
          <div className="health-pages-card-icon">💊</div>
          <h3>Prescription Refills</h3>
          <p>Request medication renewals</p>
          <button className="health-pages-button">Request Refill</button>
        </div>
      </div>
      
      <div className="health-pages-alert">
        <span>⚠️</span> Emergency? Call 911 or visit nearest ER
      </div>
      
      
    </div>
  );
}