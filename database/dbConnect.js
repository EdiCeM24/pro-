import mongoose from 'mongoose';

import { MONGODB_URI } from '../config/env.js';

export const connectDatabase = async () => {
  try{
      const connectDB = await mongoose.connect(MONGODB_URI)
      console.log(`Database is successfully connected! ${connectDB.connection.host}`);
      return connectDB;
  }catch (e) {
      console.error(`Database is unable to connect: ${e}`);
      process.exit(1);
  }
}

connectDatabase();
