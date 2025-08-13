// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1 - Logo / Branding */}
        <div className="footer-column footer-brand">
          <h2 className="footer-logo">JJ Crackers</h2>
          <p>🎆 Quality Fireworks Since 1990 🎆</p>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
        </div>

        {/* Column 3 - Policies & Info */}
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/refund">Cancellation & Refund</Link></li>
            <li><Link to="/safety">Fire Safety Tips</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4 - Contact & Socials */}
        <div className="footer-column contact-col">
          <h4>Contact Us</h4>
          <p><strong>JJ Crackers</strong></p>
          <address>
            No.372 Sandhana, <br/>
            Maariyamman Nagar, Meenampatti, <br/>
            Sivakasi-626 189.
          </address>
          <p className="phone"><FaPhone /> +91 88831 24111</p>
          <p><FaEnvelope /> <a href="mailto:jjcrackershub87@gmail.com">jjcrackershub87@gmail.com</a></p>

          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=61579090161194" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/jj_crackers_05/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 JJ Crackers. All rights reserved.</p>
        <p>Design & Development: <span className="dev-company">Semms Solutions</span></p>
      </div>
    </footer>
  );
};

export default Footer;
