const orderTemplate = (user, order) => {
  return `
    <div style="font-family: Arial; padding:20px;">
      <h2>🛒 Order Confirmation</h2>

      <p>Hello ${user.name},</p>

      <p>Your order <strong>#${order.id}</strong> has been received.</p>

      <p><strong>Total:</strong> ₦${order.total}</p>
      <p><strong>Status:</strong> ${order.status}</p>

      <hr/>

      <p>We will notify you when your order is shipped 🚚</p>

      <small>Thank you for shopping with us!</small>
    </div>
  `;
};

export default orderTemplate;