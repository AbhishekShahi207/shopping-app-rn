import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);

    console.log("Database Connected:", conn.connection.host);
  } catch (error) {
    console.log("Error in connecting to database:", error.message);
    process.exit(1);
  }
};
