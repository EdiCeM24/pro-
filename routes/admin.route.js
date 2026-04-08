import express from "express";
import { adminDelete, adminLogin, adminRegister, adminSignOut, adminSignin, adminSignup, adminUpdate, getAllOrders, getDashboard, updateOrderStatus, } from "../controllers/admin.controller.js";
import { dashboard, adminDashboard } from "../controllers/dashboard.controller.js";
import isAdmin from "../auth/admin.js";
import authorize from "../middlewares/authorize.js";
import productsRouter from "./pro.route.js";
import { products } from "../controllers/pro.controller.js";

const adminRouter = express.Router();


// GET --> Display Admin Dashboard
adminRouter.get("/", authorize, isAdmin, adminDashboard);

// GET --> Signup
adminRouter.get("/signup", adminSignup);

// POST --> Register
adminRouter.post("/register", adminRegister);

// GET --> Login
adminRouter.get("/login", authorize, isAdmin, adminLogin);

// CREATE PRODUCTS -- POST
productsRouter.post("/products", products);

// POST --> SignIn
adminRouter.post("/sign-in", adminSignin);

adminRouter.get('/dashboard', authorize, isAdmin, getDashboard); // TO CROSS CHECK WITH THE UP ONE

adminRouter.get('/orders', authorize, isAdmin, getAllOrders);

adminRouter.put('/orders/:id', authorize, isAdmin, updateOrderStatus);

// POST --> SignOut
adminRouter.post("/sign-out", adminSignOut);

// POST --> Admin CREATE (Manipulating) Resources In the Dashboard
adminRouter.post("/resources", authorize, isAdmin, adminDashboard);

// POST --> Admin UPDATE existing Resources
adminRouter.put("/update", authorize, isAdmin, adminUpdate);

// POST --> Admin DELETE Resources
adminRouter.delete("/delete",isAdmin, adminDelete);


export default adminRouter;
