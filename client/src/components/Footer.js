// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>Get in touch</h4>
          <ul>
            <li><Link to="/enquiry">Corporate / Bulk Enquiries</Link></li>
            <li><Link to="/enquiry">Become a Channel Partner</Link></li>
            <li><Link to="/enquiry">Quick Enquiry</Link></li>
            <li><Link to="/enquiry">Payment</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/">JJ Crackers</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/refund">Cancellation and Refund</Link></li>
            <li><Link to="/safety">Fire Safety Tips</Link></li>
            <li><Link to="/faq">FAQ’s</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-column contact-col">
          <h4>Contact Us</h4>
          <p><strong>Fireworks</strong></p>
          <address>
            #35/3B, ParkTown Village,<br />
            Madurai – 626 123,<br />
            Tamil Nadu, India.
          </address>
          <p className="phone">+91 93455 61247</p>
          <p>Email: <a href="mailto:fireworks@gmail.com">fireworks@gmail.com</a></p>
       <div className="social-links">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <i className="fab fa-youtube"></i>
      </a>
    </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2025 Sayee Crackers. All rights reserved.</p>
        <p>Design & Development: <span className="dev-company">Semms Solutions</span></p>
      </div>
    </footer>
  );
};

export default Footer;
