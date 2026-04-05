import mongoose from "mongoose";

const ProSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  image: {},
  price: {},
  desc: {},
  batch: {},
  isAdded: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true});


const Product = mongoose.model('Product', ProSchema);

export default Product;
  
