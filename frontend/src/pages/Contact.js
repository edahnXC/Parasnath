import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import '../styles/contact.scss';
import { useAllAnimations } from '../hooks/useAnimations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useAllAnimations();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Add form submission animation
    const form = e.target;
    form.classList.add('form-submitting');
    
    setTimeout(() => {
      form.classList.remove('form-submitting');
      form.classList.add('form-submitted');
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        form.classList.remove('form-submitted');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      <HeroSection 
        title="Contact Us" 
        subtitle="Get in touch for more information"
        imagePath="/images/mountain.jpeg"
        fullWidth
      />
      
      <div className="contact-container">
        <div className="contact-info reveal">
          <h2 className="title-animate">Our Information</h2>
          
          <div className="info-item">
            <FaMapMarkerAlt className="icon pulse" />
            <div>
              <h3>Address</h3>
              <p>Parasnath Hill, Giridih District, Jharkhand, India</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaPhone className="icon pulse" />
            <div>
              <h3>Phone</h3>
              <p>+91 XXXX XXX XXX</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaEnvelope className="icon pulse" />
            <div>
              <h3>Email</h3>
              <p>info@parasnath.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaClock className="icon pulse" />
            <div>
              <h3>Office Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form reveal">
          <h2 className="title-animate">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn pulse-on-hover">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;