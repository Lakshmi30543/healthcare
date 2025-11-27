import React, { useState } from 'react';
import './styles/HealthcareFAQ.css';

const HealthcareFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      section: "General Questions",
      questions: [
        {
          question: "What are your clinic hours?",
          answer: "Monday-Friday: 8AM-6PM, Saturday: 9AM-2PM"
        },
        {
          question: "Do you accept walk-ins?",
          answer: "Yes, but appointments are prioritized"
        },
        {
          question: "Where are you located?",
          answer: "123 Medical Drive, Suite 100, Healthville"
        },
        {
          question: "What insurance do you accept?",
          answer: "Most major providers including Aetna and Blue Cross"
        }
      ]
    },
    {
      section: "Appointments & Scheduling",
      questions: [
        {
          question: "How do I book an appointment?",
          answer: "Call (555) 123-4567 or use our online portal"
        },
        {
          question: "What's your cancellation policy?",
          answer: "24-hour notice required to avoid $25 fee"
        },
        {
          question: "Do you have telehealth options?",
          answer: "Yes, for most non-emergency visits"
        },
        {
          question: "Can I request a specific doctor?",
          answer: "Yes, when booking please specify your preference"
        }
      ]
    }
  ];

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Healthcare FAQs</h1>
        <div className="teal-underline"></div>
      </div>
      <p className="subtitle">Your questions answered</p>

      <div className="faq-side-by-side">
        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="faq-section">
            <h2 style={{ backgroundColor: '#39CABB' }}>{section.section}</h2>
            <div className="faq-questions">
              {section.questions.map((item, index) => {
                const globalIndex = sectionIndex * 100 + index;
                return (
                  <div key={globalIndex} className="faq-item">
                    <div 
                      className={`faq-question ${activeIndex === globalIndex ? 'active' : ''}`}
                      onClick={() => toggleFAQ(globalIndex)}
                    >
                      {item.question}
                      <span className="toggle-icon">
                        {activeIndex === globalIndex ? '−' : '+'}
                      </span>
                    </div>
                    {activeIndex === globalIndex && (
                      <div className="faq-answer">{item.answer}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthcareFAQ;

