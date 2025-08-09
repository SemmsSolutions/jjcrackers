// const nodemailer = require("nodemailer");
// require("dotenv").config(); // Load env variables

// const sendMail = async (order, options = {}) => {
//   try {
//     const itemList = order.items
//       .map(item => `${item.title || item.name} - Qty: ${item.qty} - Price: ₹${item.price}`)
//       .join("\n");

//     // Gmail SMTP transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     let subject = "🧨 New Crackers Order Received";
//     let text = `
// 📦 New Order Details:

// Products:
// ${itemList}

// Total Amount: ₹${order.total}

// Delivery Address:
// ${order.address}

// Payment Type: ${order.paymentMode || order.paymentType}

// Order Date: ${new Date(order.createdAt).toLocaleString()}
// `;

//     if (options.cancelled) {
//       subject = "❌ Order Cancelled Notification";
//       text = `
// ❌ Your order has been cancelled.

// Order Details:
// Products:
// ${itemList}

// Total Amount: ₹${order.total}

// Delivery Address:
// ${order.address}

// Payment Type: ${order.paymentMode || order.paymentType}

// Order Date: ${new Date(order.createdAt).toLocaleString()}

// If you have any questions, contact support.
// `;
//     }

//     const mailOptions = {
//       from: process.env.MAIL_USER,
//       to: order.email || process.env.TO_EMAIL, // customer email or fallback
//       subject,
//       text,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`✅ Email sent to: ${mailOptions.to}`);
//   } catch (err) {
//     console.error("❌ Email Sending Failed:", err); // Full error details
//   }
// };

// module.exports = sendMail;


// utils/sendMail.js




const nodemailer = require("nodemailer");

const sendMail = async (order, options = {}) => {
  const { cancelled = false, statusUpdated = false } = options;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let subject = cancelled ? "🚫 Order Cancelled" : statusUpdated ? `📦 Order ${order.status}` : "🧨 New Order Received";
  const statusText = statusUpdated ? `<p>Status Updated: <strong>${order.status}</strong></p>` : `<p>Status: ${order.status}</p>`;

  const adminMessage = `
    <h3>${subject}</h3>
    <p><strong>Name:</strong> ${order.name}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Payment:</strong> ${order.paymentMode}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <h4>Items:</h4>
    <ul>${order.items.map(item => `<li>${item.title} x ${item.qty} - ₹${item.price}</li>`).join("")}</ul>
    ${statusText}
  `;

  let customerMessage = "";
  if (cancelled) {
    customerMessage = `<h3>Dear ${order.name},</h3><p>Your order has been <b>cancelled</b>. If you need help, contact support.</p>`;
  } else if (statusUpdated) {
    customerMessage = `<h3>Dear ${order.name},</h3><p>Your order status has been updated to <strong>${order.status}</strong>.</p>`;
  } else {
    customerMessage = `<h3>Dear ${order.name},</h3><p>Thanks for ordering! Your crackers order has been placed successfully 🎉</p><p>Total: ₹${order.total}</p>`;
  }

  const mailOptions = [
    { from: process.env.MAIL_USER, to: process.env.TO_EMAIL, subject, html: adminMessage },
    { from: process.env.MAIL_USER, to: order.email, subject, html: customerMessage },
  ];

  for (const mail of mailOptions) {
    await transporter.sendMail(mail);
  }
};

module.exports = sendMail;


// const nodemailer = require("nodemailer");

// const sendMail = async (order, options = {}) => {
//   const { cancelled = false } = options;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   const subject = cancelled ? "🚫 Order Cancelled" : "🧨 New Order Received";

//   const adminMessage = `
//     <h3>${subject}</h3>
//     <p><strong>Name:</strong> ${order.name}</p>
//     <p><strong>Phone:</strong> ${order.phone}</p>
//     <p><strong>Email:</strong> ${order.email}</p>
//     <p><strong>Payment:</strong> ${order.paymentMode}</p>
//     <p><strong>Address:</strong> ${order.address}</p>
//     <p><strong>Total:</strong> ₹${order.total}</p>
//     <h4>Items:</h4>
//     <ul>
//       ${order.items
//         .map(
//           (item) => `<li>${item.title} x ${item.qty} - ₹${item.price}</li>`
//         )
//         .join("")}
//     </ul>
//     <p>Status: ${order.status}</p>
//   `;

//   const customerMessage = cancelled
//     ? `<h3>Dear ${order.name},</h3><p>Your order has been <b>cancelled</b>. If you need help, contact support.</p>`
//     : `<h3>Dear ${order.name},</h3><p>Thanks for ordering! Your crackers order has been placed successfully 🎉</p><p>Total: ₹${order.total}</p>`;

//   const mailOptions = [
//     {
//       from: process.env.MAIL_USER,
//       to: process.env.TO_EMAIL,
//       subject,
//       html: adminMessage,
//     },
//     {
//       from: process.env.MAIL_USER,
//       to: order.email,
//       subject: cancelled ? "Your Order Was Cancelled" : "Your Order is Confirmed",
//       html: customerMessage,
//     },
//   ];

//   for (const mail of mailOptions) {
//     await transporter.sendMail(mail);
//   }
// };

// module.exports = sendMail;
