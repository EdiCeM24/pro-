import Cart from '../models/Cart.model.js';
import CartItem from '../models/CartItem.model.js';
import Product from '../models/pro.model.js';


const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ where: { UserId: userId } });

  if (!cart) {
    cart = await Cart.create({ UserId: userId });
  }

  const product = await Product.findByPk(productId);

  const [item, created] = await CartItem.findOrCreate({
    where: { CartId: cart.id, ProductId: productId },
    defaults: { quantity }
  });

  if (!created) {
    item.quantity += quantity;
    await item.save();
  }

  res.json({ message: 'Added to cart' });
};


const getCart = async (req, res) => {
  const cart = await Cart.findOne({
    where: { UserId: req.user.id },
    include: {
      model: Product
    }
  });

  res.json(cart);
};


const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  await CartItem.destroy({
    where: {
      ProductId: productId
    }
  });

  res.json({ message: 'Removed from cart' });
};


export { removeFromCart, getCart, addToCart }