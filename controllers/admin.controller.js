import express from "express";
import Admin from "../models/admin.model.js";
import bcryptSalt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET_KEY, NODE_ENV } from "../config/env.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import multer from "multer";


const app = express();


app.use(cookieParser());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/admin')
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB in bytes
    },
});


const adminSignup = (req, res) => {
  try {
    res.render("adminRegister", { title: `Admin Welcome! Register...`})
  } catch (error) {
    if(!res.ok) {
      console.error("Admin panel has error: ", error);
      res.status(400).json({ message: `Error occurred while loading admin panel: ${error}`});
    }
  }
};


const adminLogin = (req, res) => {
  try {
    res.render("adminLogin", { title: `Admin Welcome! Sign In...`})
  } catch (error) {
    if(!res.ok) {
      console.error("Admin panel has error: ", error);
      res.status(400).json({ message: `Error occurred while loading admin panel: ${error}`});
    }
  }
};





// This Will Redirect To Login Page
const adminRegister = async (req, res) => {
  const profile = req.file.profile;
  console.log(`Profile: ${profile}`);

  try {
    const { firstName, surName, username, email, mobile, password, isAdmin } = req.body;

    if (!(firstName == "" && surName=="" && username == "" && email == "" && mobile == "" && password == "" && isAdmin == "" )){
      res.status(400).json({ message: "All fields are required!" })
    };

    const existingUser = await Admin.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({message: 'User email address already exist.'});
    }

    const salt = await bcryptSalt.genSalt(10);

    const hashedPassword = await bcryptSalt.hash(password, salt);

    const newAdmin = await Admin.create({
      firstName,
      surName,
      username,
      email,
      profile,
      mobile,
      password: hashedPassword,
      isAdmin: true,
      data: {
        accessToken
      }
    });

    const accessToken = jwt.sign({id: newAdmin._id, email}, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN
    });

    newAdmin.accessToken = accessToken,
    newAdmin.password = undefined;

    res.status(201).json({newAdmin});



  } catch (err) {
    
  }
};

// This Will Redirect To Admin Dashboard Page
const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ message: "All fields are required!" })
    };

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    if (admin && (await bcryptSalt.compare(password, admin.password))) {
      const accessToken = jwt.sign({id: admin._id, email}, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN
      });

      admin.accessToken = accessToken,
      admin.password = undefined;

        // cookeParser.token section;
        const cookieOptions = {
          expires: new Date(Date.now() + JWT_EXPIRES_IN),
          accessToken: accessToken,
          httpOnly: true,
        }
        res.cookie("accessToken", accessToken, cookieOptions).json({ 
          secure: NODE_ENV === "production",
          maxAge: JWT_EXPIRES_IN,
          httpOnly: true,
          admin
        });
        
      res.status(200).json({ admin });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
    return res.redirect("admin", {
      success: "Admin has been signed in successfully!"
    });
  } catch (error) {
    console.error("Error occurred while admin signing in: ", error);
    res.status(500).json({ message: "Internal server error! " , error});
  }
};


const adminSignOut = async (req, res) => {};

// The TWO below will be hidden from admin so as not to change his or her credentials and give fake:
const adminUpdate = async (req, res) => {};

const adminDelete = async (req, res) => {};



export { adminSignup, adminLogin, adminRegister, adminSignin, adminSignOut, adminUpdate, adminDelete }
