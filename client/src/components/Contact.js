import React from "react";
import "../styles/Contact.css";

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
            SF #345/3B, Naranapuram Village,
            <br />
            Sivakasi – 626 123, Tamil Nadu, India.
          </p>
          <p className="phone">
            <strong>+91 93455 61247</strong>
          </p>
          <a href="mailto:jjcrackershub87@gmail.com" className="email-link">
            jjcrackershub87@gmail.com
          </a>

          <hr />

          <p className="follow-text">Follow us:</p>
          <div className="social-icons">
            <a
              href="#"
              aria-label="Facebook"
              className="social-icon facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="social-icon instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="social-icon linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="social-icon youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
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
