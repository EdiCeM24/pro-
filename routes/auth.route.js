import express from 'express';
import { signup, register, login, signIn, signOut, upload, authUpdate, authDelete, } from '../controllers/auth.controller.js';
import authorize from '../middlewares/authorize.js';


const authRouter = express.Router();


// SIGNUP AND LOGIN
authRouter.get('/signup', authorize, signup);


authRouter.post('/register', upload.single('image'), register);


// LOGIN ROUTES
authRouter.get('/login', authorize, login);


authRouter.post('/sign-in', signIn);

authRouter.put('/user/:id', authUpdate);

authRouter.delete('/user/:id', authDelete);

authRouter.post('/sign-out', signOut);



export default authRouter;