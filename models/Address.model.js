
import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const addressSchema = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    },
  },
  tablfNam: 'carts',
}, { timestamps: true });

const Address = addressSchema;

export default Address;