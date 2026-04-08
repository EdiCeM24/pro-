import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const cartSchema = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  tableName: 'cart',
});

const Cart = cartSchema;

export default Cart;
