import express from "express";
import { addToWishlist, getWishlist } from "../controllers/wishList.controller.js";

const whishlistRouter = express.Router();


whishlistRouter.post('/add', addToWishlist);

whishlistRouter.get('/', getWishlist);


export default whishlistRouter;