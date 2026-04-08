import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const whishListSchema = sequelize.define("aishlist", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
});

const WishList = whishListSchema;

export default WishList;
