import express from "express";
import { adminDashboard, dashboard } from "../controllers/dashboard.controller.js";
import isAdmin from "../auth/admin.js";
import authorize from "../middlewares/authorize.js";

const dashboardRouter = express.Router();

// I will Have to Comment out this due to anonymous user not to access when trying on browser.
dashboardRouter.get("/", authorize, isAdmin, dashboard);

dashboardRouter.post("/dashboard", isAdmin, adminDashboard);



export default dashboardRouter;
