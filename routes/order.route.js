import express from "express";
import checkout from "../controllers/order.controller>js";

const orderRouter = express.Router();


orderRouter.post('/checkout', checkout);


export default orderRouter;