import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";

const cartItemSchema = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cart',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  total: {
    type: DataTypes.FLOAT,
    required: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

const CartItem = cartItemSchema;

export default CartItem;