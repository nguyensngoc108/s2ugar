import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmation = async (order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.customerEmail,
    subject: 'Order Confirmation - Baking Shop',
    html: `
      <h2>Your Order Has Been Received!</h2>
      <p>Dear ${order.customerName},</p>
      <p>Thank you for your order. Here are the details:</p>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Total Price:</strong> $${order.totalPrice}</p>
      <p><strong>Delivery Date:</strong> ${order.deliveryDate}</p>
      <p>We will contact you soon to confirm your order.</p>
      <p>Best regards,<br>Baking Shop Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendOrderNotification = async (adminEmail, order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject: 'New Order Received - Baking Shop',
    html: `
      <h2>New Order Received!</h2>
      <p><strong>Customer:</strong> ${order.customerName}</p>
      <p><strong>Email:</strong> ${order.customerEmail}</p>
      <p><strong>Phone:</strong> ${order.customerPhone}</p>
      <p><strong>Total Price:</strong> $${order.totalPrice}</p>
      <p><strong>Delivery Date:</strong> ${order.deliveryDate}</p>
      <p><strong>Special Requests:</strong> ${order.specialRequests || 'None'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
