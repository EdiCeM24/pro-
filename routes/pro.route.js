import express from "express";
import { homePage, products, productUpdate, deleteProducts } from "../controllers/pro.controller.js";

const productsRouter = express.Router();


productsRouter.get("/", homePage);

productsRouter.post("/products", products);

productsRouter.put("/update/:id", productUpdate);

productsRouter.delete("/delete/:id", deleteProducts);



export default productsRouter;

