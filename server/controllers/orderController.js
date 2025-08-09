const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOrderEmails = async (order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS
    }
  });

  const adminMail = {
    from: `"JJ Crackers Orders" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🧾 New Order from ${order.name}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <h4>Items Ordered:</h4>
      <ul>
        ${order.items.map(item => `<li>${item.title} – ₹${item.price} x ${item.qty}</li>`).join('')}
      </ul>
    `
  };

  const customerMail = {
    from: `"JJ Crackers Hub" <${process.env.ADMIN_EMAIL}>`,
    to: order.email,
    subject: "🎉 Order Confirmed – JJ Crackers",
    html: `
      <h2>Thank you for your order, ${order.name}!</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
      <h4>Order Summary:</h4>
      <ul>
        ${order.items.map(item => `<li>${item.title} – ₹${item.price} x ${item.qty}</li>`).join('')}
      </ul>
      <p>We’ll contact you soon for delivery. 📦</p>
    `
  };

  await transporter.sendMail(adminMail);
  await transporter.sendMail(customerMail);
};

module.exports = { sendOrderEmails };
