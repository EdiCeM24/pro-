import express from "express";
import { homePage, productUpdate, deleteProducts, getProducts, getProductById } from "../controllers/pro.controller.js";

const productsRouter = express.Router();


productsRouter.get("/", homePage);

// productsRouter.post("/products", products);

productsRouter.get("/products", getProducts);

productsRouter.get("/product/:id", getProductById);

productsRouter.put("/update/:id", productUpdate);

productsRouter.delete("/delete/:id", deleteProducts);



export default productsRouter;

