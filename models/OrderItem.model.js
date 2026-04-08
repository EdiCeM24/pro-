import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const orderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  productId: {
    
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
});

const OrderItem = orderItem;

export default OrderItem;