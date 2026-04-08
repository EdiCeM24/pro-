'use strict';

import User from "./User.model.js";
import Product from "./pro.model.js";
import Order from "./Order.model.js";
import OrderItem from "./OrderItem.model.js";
import Cart from "./Cart.model.js";
import CartItem from "./CartItem.model.js";
import WishList from "./WishList.model.js";
import Address from "./Address.model.js";


// RELATIONSHIPS
// CART
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// 
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

//
Cart.belongsTo(Product, { through: CartItem });
Product.belongsTo(Cart, { through: CartItem });

// ORDER
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// WISHLIST
User.hasMany(WishList, { foreignKey: 'userId' });
WishList.belongsTo(User, { foreignKey: 'userId' });

WishList.belongsToMany(Product, { through: 'WishlistItems' });

module.exports = {
  User, Product, Cart, CartItem,
  Order, OrderItem, WishList, Address
};  

// One category → many products
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// USER ADDRESS RELATIONSHIP
User.hasMany(Address, {foreignKey: "userId"});
Address.belongsTo(User, {foreignKey: "userId"});


export { User, Product, Order, OrderItem, Cart, CartItem, WishList, Address };