import React from 'react';
import '../styles/InfoPage.css';  

const CancellationRefundPolicy = () => (
  <div className="info-container">
    <h1 className="info-title">Cancellation and Refund Policy</h1>
    <p className="info-intro">
      At JJ Crackers, we strive to ensure customer satisfaction. Please read our Cancellation and Refund Policy carefully before placing your order.
    </p>

    <section className="info-section">
      <h2>1. Order Cancellation</h2>
      <ul>
        <li>Orders can be cancelled within <strong>24 hours</strong> of placing the order or before dispatch, whichever is earlier.</li>
        <li>To request a cancellation, please email us at <strong>jjcrackershub87@gmail.com</strong> with your order details.</li>
        <li>Once the order has been dispatched or packed, it cannot be cancelled.</li>
      </ul>
    </section>

    <section className="info-section">
      <h2>2. Refund Eligibility</h2>
      <ul>
        <li>Refunds will only be issued in the following cases:</li>
        <ul>
          <li>Damaged or defective items received</li>
          <li>Wrong items delivered</li>
          <li>Order cancelled within the eligible time frame</li>
        </ul>
        <li>We do not offer refunds for delays caused by third-party courier services or incorrect addresses provided by the customer.</li>
      </ul>
    </section>

    <section className="info-section">
      <h2>3. Refund Process</h2>
      <ul>
        <li>To initiate a refund, please contact us at <strong>jjcrackershub87@gmail.com</strong> within <strong>48 hours</strong> of receiving the product.</li>
        <li>Include photos of the damaged or incorrect product for verification.</li>
        <li>Once approved, the refund will be processed within <strong>7–10 business days</strong> to your original payment method.</li>
      </ul>
    </section>

    <section className="info-section">
      <h2>4. No Return Policy</h2>
      <p>Due to the sensitive and seasonal nature of crackers, we do not accept returns of products once delivered.</p>
    </section>

    <section className="info-section">
      <h2>5. Contact Information</h2>
      <p>If you have any questions about cancellations or refunds, feel free to contact us:</p>
      <p><strong>Email:</strong> jjcrackershub87@gmail.com</p>
    </section>
  </div>
);

export default CancellationRefundPolicy;
