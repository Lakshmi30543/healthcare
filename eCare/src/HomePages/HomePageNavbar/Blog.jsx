import React from 'react';
import '../styles/blog.css';
import post1Image from '../../assets/images/Blog1.jpg';
import post2Image from '../../assets/images/Blog2.jpg';
import post3Image from '../../assets/images/Blog3.jpg';

export default function Blog() {
  return (
    <div className="gpt-blog-section">
      <div className="gpt-blog-container">
        <h2 className="gpt-blog-heading">Latest Blog</h2>
        
        <div className="gpt-blog-grid">
          {/* Blog Post 1 */}
          <div className="gpt-blog-post"> 
            <div className="gpt-image-wrapper">
              <img src={post1Image} alt="NABH Compliance" className="gpt-post-image" />
              <div className="gpt-date-badge">21 NOV</div>
            </div>
            <div className="gpt-post-content">
              <div className="gpt-post-header">
                <span className="gpt-post-category">Hospital Management Software</span>
                <span className="gpt-new-badge">New</span>
              </div>
              <h3 className="gpt-post-title">Helping you achieve NABH Compliance</h3>
              <p className="gpt-post-excerpt">Hospital Management Software Helping you Achieve NABH Compliance</p>
              <a href="#" className="gpt-learn-more">Learn more →</a>
            </div>
          </div>
          
          {/* Blog Post 2 */}
          <div className="gpt-blog-post">
            <div className="gpt-image-wrapper">
              <img src={post2Image} alt="Billing Software" className="gpt-post-image" />
              <div className="gpt-date-badge">07 MAY</div>
            </div>
            <div className="gpt-post-content">
              <div className="gpt-post-header">
                <span className="gpt-post-category">Hospital Billing Software</span>
                <span className="gpt-new-badge">New</span>
              </div>
              <h3 className="gpt-post-title">How Hospital Billing Software Enhances Patient Experience</h3>
              <p className="gpt-post-excerpt">From Admission to Discharge</p>
              <a href="#" className="gpt-learn-more">Learn more →</a>
            </div>
          </div>
          
          {/* Blog Post 3 */}
          <div className="gpt-blog-post">
            <div className="gpt-image-wrapper">
              <img src={post3Image} alt="Hospital Management" className="gpt-post-image" />
              <div className="gpt-date-badge">20 JUN</div>
            </div>
            <div className="gpt-post-content">
              <div className="gpt-post-header">
                <span className="gpt-post-category">Management Software</span>
                <span className="gpt-new-badge">New</span>
              </div>
              <h3 className="gpt-post-title">Implementing Clinic and Hospital Management Software</h3>
              <p className="gpt-post-excerpt">Benefits of Implementing Clinic and Hospital Management Software</p>
              <a href="#" className="gpt-learn-more">Learn more →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}