import sendEmail from '../utils/sendEmail';
import User from '../models/User.model.js';
import Cart from '../models/Cart.model.js';
import CartItem from '../models/CartItem.model.js';
import Product from '../models/pro.model.js';
import Order from '../models/Order.model.js';
import OrderItem from '../models/OrderItem.model.js';
import calculateDeliveryFee from '../utils/deliveryFee.js';
import Address from '../models/Address.model.js';
import orderTemplate from '../utils/email/orderTemplate.js';
import { sendSMS } from '../utils/sendSMS.js';


const checkout = async (req, res) => {
  const userId = req.user.id;
  const { addressId } = req.body;

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "No user found!"});
  };

  const address = await Address.findByPk(addressId);

  const deliveryFee = calculateDeliveryFee(address.state);

  const deliveryFees = await getDeliveryFee(address.lat, address.lng);

  let total = 0;

  cart.Products.forEach(p => {
    total += p.price * p.CartItem.quantity;
  });  

  const cart = await Cart.findOne({
    where: { UserId: userId },
    include: Product
  });

  if (!cart || cart.Products.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  total += deliveryFee + deliveryFees; // CROSS CHECK THOROUGHLY

  const order = await Order.create({
    UserId: userId,
    total,
    addressId
  });

  for (let product of cart.Products) {
    await OrderItem.create({
      OrderId: order.id,
      ProductId: product.id,
      quantity: product.CartItem.quantity,
      price: product.price
    });
  }

  // Clear cart
  await CartItem.destroy({ where: { CartId: cart.id } });

  // After Order Created
  await sendSMS(
    user.phone,
  ` Your order #${order.id} has been placed successfully.`
  );

  res.json({ message: 'Order created', order });

  // BEFORE PAYMENT
  await sendEmail(
    User.email,
    'Order Initiated',
    'Your order has been created and is awaiting payment.',
    orderTemplate(user, order)
  );

  // AFTER PAYMENT (in verifyPayment)
  await sendEmail(
    User.email,
    'Payment Successful',
    'Your payment was successful. Your order is being processed.'
  );

  // WHEN ORDER SHIPPED
  await sendSMS(
    user.phone,
    `Your order #${order.id} has been shipped 🚚`
  );

  // WHEN ORDER DELIVERED
  await sendSMS(
    user.phone,
    `Your order #${order.id} has been delivered 🎉`
  );
};


const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  await order.update({ status });

  res.json(order);
};





export { checkout, updateOrderStatus };