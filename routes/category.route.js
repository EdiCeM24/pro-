import express from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";

const categoryRouter = express.Router();


categoryRouter.get("/category", getCategories);

categoryRouter.post("/category", createCategory);

export default categoryRouter;