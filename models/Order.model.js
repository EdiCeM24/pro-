// models/Order.js
import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const orderSchema = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    required: true,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered'),
    default: 'pending'
  },
  deliveryFee: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usertables',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, { timestamps: true });

const Order = orderSchema;

export default Order;