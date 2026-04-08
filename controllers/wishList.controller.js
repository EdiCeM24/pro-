import WishList from '../models/WishList.model.js';
import Product from '../models/pro.model.js';


const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  let wishlist = await WishList.findOne({ where: { UserId: userId } });

  if (!wishlist) {
    wishlist = await WishList.create({ UserId: userId });
  }

  await wishlist.addProduct(productId);

  res.json({ message: 'Added to wishlist' });
};


const getWishlist = async (req, res) => {
  const wishlist = await WishList.findOne({
    where: { UserId: req.user.id },
    include: Product
  });

  res.json(wishlist);
};

export { getWishlist, addToWishlist };