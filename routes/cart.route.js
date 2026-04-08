import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import authorize from "../middlewares/authorize.js";

const cartRouter = express.Router();


cartRouter.post('/add', authorize, addToCart);

cartRouter.get('/', getCart);

cartRouter.delete('/remove', removeFromCart);


export default cartRouter;