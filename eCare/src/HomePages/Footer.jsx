import React from 'react';
import { Phone, Mail, AlertCircle, AlertTriangle, Facebook, Twitter, Instagram, Linkedin, HeartPulse } from 'lucide-react';
import "./styles/footer.css"
export default function Footer() {
  return (
    <div className="footer-root">
      <footer className="footer" role="contentinfo">
        {/* Top Contact Section */}
        <div className="footer-top">
          <div className="footer-top-content">
            <h1>Your Health is Our Priority</h1>
            <div className="footer-contact-info">
              {/* 24/7 Support Card */}
              <div className="footer-contact-card">
                <div className="footer-contact-header">
                  <div className="footer-contact-icon">
                    <Phone size={20} />
                  </div>
                  <h3 className="footer-contact-title">24/7 Patient Support</h3>
                </div>
                <p className="footer-contact-detail">
                  <a href="tel:+15658954598">
                    <Phone size={18} /> +91 9345453432
                  </a>
                </p>
              </div>

              {/* Email Card */}
              <div className="footer-contact-card">
                <div className="footer-contact-header">
                  <div className="footer-contact-icon">
                    <Mail size={20} />
                  </div>
                  <h3 className="footer-contact-title">Email Our Team</h3>
                </div>
                <p className="footer-contact-detail">
                  <a href="mailto:info@doccurehealth.com">
                    <Mail size={18} /> eCare@health.com
                  </a>
                </p>
              </div>

              {/* Emergency Card */}
              <div className="footer-contact-card">
                <div className="footer-contact-header">
                  <div className="footer-contact-icon">
                    <AlertCircle size={20} />
                  </div>
                  <h3 className="footer-contact-title">Emergency Services</h3>
                </div>
                <p className="footer-contact-detail emergency-highlight">
                  <a href="tel:911">
                    <AlertTriangle size={18} /> Call 911
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Links */}
          <div className="footer-column">
            <h2 id="footer-company-heading">Company</h2>
            <ul aria-labelledby="footer-company-heading">
              <li><a href="/about">About Us</a></li>
              <li><a href="/leadership">Leadership</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/news">News & Press</a></li>
              <li><a href="/locations">Locations</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div className="footer-column">
            <h2 id="footer-patients-heading">For Patients</h2>
            <ul aria-labelledby="footer-patients-heading">
              <li><a href="/find-a-doctor">Find a Doctor</a></li>
              <li><a href="/patient-portal">Patient Portal</a></li>
              <li><a href="/billing">Billing & Insurance</a></li>
              <li><a href="/medical-records">Medical Records</a></li>
              <li><a href="/patient-guide">Patient Guide</a></li>
              <li><a href="/visitor-info">Visitor Information</a></li>
            </ul>
          </div>

          {/* Health Services */}
          <div className="footer-column">
            <h2 id="footer-services-heading">Services</h2>
            <ul aria-labelledby="footer-services-heading">
              <li><a href="/primary-care">Primary Care</a></li>
              <li><a href="/specialty-care">Specialty Care</a></li>
              <li><a href="/emergency-care">Emergency Care</a></li>
              <li><a href="/surgical-services">Surgical Services</a></li>
              <li><a href="/diagnostic-imaging">Diagnostic Imaging</a></li>
              <li><a href="/rehabilitation">Rehabilitation</a></li>
            </ul>
          </div>

          {/* Medical Specialties */}
          <div className="footer-column">
            <h2 id="footer-specialties-heading">Specialties</h2>
            <ul aria-labelledby="footer-specialties-heading">
              <li><a href="/cardiology">Cardiology</a></li>
              <li><a href="/oncology">Oncology</a></li>
              <li><a href="/neurology">Neurology</a></li>
              <li><a href="/orthopedics">Orthopedics</a></li>
              <li><a href="/pediatrics">Pediatrics</a></li>
              <li><a href="/womens-health">Women's Health</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h3 id="footer-newsletter-heading">Stay Informed</h3>
            <p>Subscribe to our newsletter for health tips, news, and updates from our medical experts.</p>
            <form className="newsletter-form">
              <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
              <input 
                type="email" 
                id="newsletter-email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          {/* Social Connect - moved out of newsletter */}
          <div className="footer-connect">
            <h3>Connect With Us</h3>
            <div className="footer-social-icons">
              <a href="https://facebook.com/doccure" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com/doccure" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com/doccure" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com/company/doccure" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} eCare Health Systems. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/notice-of-privacy">Notice of Privacy</a>
            <a href="/non-discrimination">Non-Discrimination</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}