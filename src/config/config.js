import mongoose from "mongoose";
import  colors  from "colors";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_url);
    console.log("Connected to DataBase Suceessfully!".bgGreen);
  } catch (error) {
    console.log("DB Error", error, colors.bgred);
  }
};
