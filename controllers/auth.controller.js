import express from "express";
import  User  from '../models/User.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET_KEY, REFRESH_SECRET_KEY, NODE_ENV } from '../config/env.js';
import bcryptSalt from 'bcryptjs';
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import jwt from "jsonwebtoken";


const app = express();


app.use(cookieParser());
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploadProfile')
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


const signup = (req, res) => {
 
  try {
    res.render('index', { message: 'Sign up page successfully loaded!'});
  } catch (error) {
    if (!res.ok) {
      console.error('It is unable to load page:', error);
      res.status(400).json({ message: `Page is unable to render resources: ${error}`});
    }
  }
};


const register = async (req, res) => {
  const { name, username, email, mobile, password } = req.body;

    console.log(`Name: ${name}`);
    console.log(`Userame: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Mobile: ${mobile}`);
    console.log(`Password: ${password}`);

  try {
     if (!(name && username && email && mobile && password)) {
        return res.status(403).json({ message: 'User data unavailable.'})
     }

     const image = req.file.image;
     console.log(`Image: ${image}`);

     const existingUser = await User.findOne({ email });

     if (existingUser) {
         return res.status(409).json({message: 'User email address already exist.'});
     }

     const salt = await bcryptSalt.genSalt(10);
     const hashedPassword = bcryptSalt.hash(password, salt);

     const newUser = await User.create({
         name,
         username,
         email,
         mobile,
         password: hashedPassword,
         image,
     })

     const token = jwt.sign({id: newUser._id, email}, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRES_IN,
     });

     newUser.token = token,
     newUser.password = undefined

     req.cookieParser.token;
      return res.redirect('login', {
        success: 'User has been registered successfully!',
        token
      });
  } catch (error) {
    return res.status(400).json({ message: `Error in signing up a user: ${error}`});
  }

};


const login = (req, res) => {
 
  try {
    res.render('login', { message: 'Sign up page successfully loaded!'});
  } catch (error) {
    if (!res.ok) {
      console.error('It is unable to load page:', error);
      res.status(400).json({ message: `Page is unable to render resources: ${error}`});
    }
  }
};


const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(409).json({ message: "All fields are required!" })
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!"})
    };

    if (user && (await bcryptSalt.compare(password, user.hashedPassword))) {
      const token = jwt.sign({ id: user._id, email, role: user.role }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRES_IN,
      })

      user.token = token,
      user.password = undefined;

        // cookeParser.token section;
        const tokenFromCookie = {
          expires: new Date(Date.now() + JWT_EXPIRES_IN),
          token: token,
          httpOnly: true,
        }
        res.cookie("token", token, tokenFromCookie).json({ 
          secure: NODE_ENV === "production",
          maxAge: JWT_EXPIRES_IN,
          httpOnly: true,
          user
        });

      res.status(200).json({ user });
    }else {
      return res.status(401).json({ message: "Invalid email or password!" })
    };

    return res.redirect("/home", {
      success: `${user.username} has been signed in successfully!`
    });
  } catch (error) {
    console.error("Error occurred while admin signing in: ", error);
    res.status(500).json({ message: "Internal server error!", error });
  }
};


const authUpdate = async (req, res) => {};

const authDelete = async (req, res) => {};


const signOut = async (req, res) => {}

export { signup, register, login, signIn, authUpdate, authDelete, signOut }