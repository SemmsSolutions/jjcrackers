import React from "react";
import "../styles/Contact.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";


const Contact = () => {
  return (
    <section className="contact-section">
      <h1>You can ask us questions</h1>
      <p className="intro-text">
        Contact us for all your questions and opinions, or you can solve your
        problems in a shorter time with our contact offices.
      </p>

      <div className="contact-container">
        {/* Left side - Contact info */}
        <div className="contact-info">
          <h2>Sayee Fireworks</h2>
          <p className="address">
            <span role="img" aria-label="location">
              📍
            </span>{" "}
           J J Crackers, No.372 Sandhana,
Maariyamman Nagar, Meenampatti,
Sivakasi-626 189.

          </p>
          <p className="phone">
            <strong>+91 88831 24111</strong>
          </p>
          <a href="mailto:jjcrackershub87@gmail.com" className="email-link">
            jjcrackershub87@gmail.com
          </a>

          <hr />

          <p className="follow-text">Follow us:</p>
           <div className="social-icons">
      <a
        href="https://www.facebook.com/profile.php?id=61579090161194"
        aria-label="Facebook"
        className="social-icon facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF />
      </a>
      <a
        href="https://www.instagram.com/jj_crackers_05/"
        aria-label="Instagram"
        className="social-icon instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      {/* <a
        href="https://www.linkedin.com/in/yourpage"
        aria-label="LinkedIn"
        className="social-icon linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a> */}
      {/* <a
        href="https://www.youtube.com/yourchannel"
        aria-label="YouTube"
        className="social-icon youtube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube />
      </a> */}
    </div>
        </div>

        {/* Right side - Form */}
        <div className="contact-form-container">
          <h2>Send Enquiry</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted!");
            }}
          >
            <div className="input-group">
              <label htmlFor="name">Name*</label>
              <input id="name" type="text" required placeholder="Your Name" />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone*</label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="Phone Number"
              />
            </div>
            <div className="input-group full-width">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Your Email"
              />
            </div>
            <div className="input-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
