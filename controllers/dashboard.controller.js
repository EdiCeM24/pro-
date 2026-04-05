import express from "express";
import Product from "../models/pro.model.js";
import User from "../models/User.model.js";
import multer from "multer";
import cookieParser from "cookie-parser";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const dashboard = (req, res) => {
  try {
    res.render("admin", { title: "Admin Office page"});
  } catch (error) {
    if (!res.ok) {
      console.error("Admin panel has error: ", error);
      res.status(400).json({ message: `Error occurred while loading admin panel: ${error}`});
    }
  }
};


const adminDashboard = (req, res) => {
  
  try {
    res.send("Welcome to our dashboard logic centre.")
    
  } catch (error) {
    
  }
};


export { dashboard, adminDashboard }
