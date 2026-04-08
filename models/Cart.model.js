import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const cartSchema = sequelize.define('Cart', {

});

const Cart = cartSchema;

export default Cart;
