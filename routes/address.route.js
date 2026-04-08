import express from "express";
import { addAddress, getUserAddresses } from "../controllers/address.controller";

const addressRouter = express.Router();


addressRouter.get('/', protect, getUserAddresses);


addressRouter.post('/', protect, addAddress);


export default addressRouter;