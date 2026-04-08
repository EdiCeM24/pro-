import express from "express";
import verifyPayment from "../middlewares/verifyPayment.js";
import initializePayment from "../controllers/pay.controller.js";

const payRouter = express.Router();


payRouter.get('/verify/:reference', verifyPayment);

payRouter.post('/pay', initializePayment);



export default payRouter;

