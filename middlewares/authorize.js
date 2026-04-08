import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js';
import User from '../models/User.model.js';


const authorize = (req, res, next) => {
  // Grab token from cookie
  console.log(req.cookies.token);
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    // decode that token and get id
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decoded);

    // Query to DB for that user id
    const user = User.findByPk(decoded.id);
    console.log(user);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authorize;
