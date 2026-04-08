import { DataTypes } from "sequelize";
import sequelize from "../database/dbConnect.js";


const deliveryZoneSchema = sequelize.define('OrderItem', {
  id: {},
  name: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
  radius: DataTypes.FLOAT, // km
  fee: DataTypes.FLOAT

}, { timestamps: true });  

const DeliveryZone = deliveryZoneSchema;

export default DeliveryZone;


