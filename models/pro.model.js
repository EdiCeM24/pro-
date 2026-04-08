import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const proSchema = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB,
    required: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    required: true,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    required: true,
    allowNull: false,
    defaultValue: 0,
  },
  color: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  batch: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Category',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    required: true,
    default: false,
    allowNull: false,
  },
}, {timestamps: true});


const Product = ('product', proSchema);

export default Product;
  
