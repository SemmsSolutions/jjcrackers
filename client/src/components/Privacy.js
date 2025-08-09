import React from 'react';
import '../styles/InfoPage.css'; // ✅ Shared CSS for all info pages

const PrivacyPolicy = () => (
  <div className="info-container">
    <h1 className="info-title">Privacy Policy</h1>

    <p className="info-intro">
      At JJ Crackers, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.
    </p>

    <section className="info-section">
      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information when you interact with our website:</p>
      <ul>
        <li>Name</li>
        <li>Contact details (including email address and phone number)</li>
        <li>Delivery address</li>
        <li>Order and transaction details</li>
      </ul>
    </section>

    <section className="info-section">
      <h2>2. How We Use Your Information</h2>
      <p>The information we collect is used to:</p>
      <ul>
        <li>Process your orders and deliver products</li>
        <li>Respond to your inquiries and provide customer support</li>
        <li>Send order updates and promotional offers (if subscribed)</li>
        <li>Improve our website and services</li>
      </ul>
    </section>

    <section className="info-section">
      <h2>3. Data Protection</h2>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
    </section>

    <section className="info-section">
      <h2>4. Sharing Your Information</h2>
      <p>We do not sell, trade, or rent your personal information to third parties. Your data may only be shared with delivery partners or government authorities as required by law.</p>
    </section>

    <section className="info-section">
      <h2>5. Cookies</h2>
      <p>Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings if you prefer.</p>
    </section>

    <section className="info-section">
      <h2>6. Your Rights</h2>
      <p>You have the right to access, update, or request deletion of your personal information by contacting us at the email provided below.</p>
    </section>

    <section className="info-section">
      <h2>7. Changes to This Policy</h2>
      <p>We may update this privacy policy from time to time. Any changes will be posted on this page.</p>
    </section>

    <section className="info-section">
      <h2>8. Contact Us</h2>
      <p>If you have any questions or concerns regarding our privacy practices, please contact us:</p>
      <p><strong>Email:</strong> jjcrackershub87@gmail.com</p>
    </section>
  </div>
);

export default PrivacyPolicy;
