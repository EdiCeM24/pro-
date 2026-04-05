import express from "express";
import { adminDelete, adminLogin, adminRegister, adminSignOut, adminSignin, adminSignup, adminUpdate, } from "../controllers/admin.controller.js";
import { dashboard, adminDashboard } from "../controllers/dashboard.controller.js";
import isAdmin from "../auth/admin.js";
import authorize from "../middlewares/authorize.js";

const adminRouter = express.Router();

// GET --> Display Admin Dashboard
adminRouter.get("/", authorize, isAdmin, adminDashboard);

// GET --> Signup
adminRouter.get("/signup", adminSignup);

// POST --> Register
adminRouter.post("/register", adminRegister);

// GET --> Login
adminRouter.get("/login", authorize, isAdmin, adminLogin);

// POST --> SignIn
adminRouter.post("/sign-in", adminSignin);

// POST --> SignOut
adminRouter.post("/sign-out", adminSignOut);

// POST --> Admin CREATE (Manipulating) Resources In the Dashboard
adminRouter.post("/resources", authorize, isAdmin, adminDashboard);

// POST --> Admin UPDATE existing Resources
adminRouter.put("/update", authorize, isAdmin, adminUpdate);

// POST --> Admin DELETE Resources
adminRouter.delete("/delete",isAdmin, adminDelete);


export default adminRouter;
