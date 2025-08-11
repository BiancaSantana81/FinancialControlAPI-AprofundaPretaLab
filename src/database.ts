import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "default");
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error);
    process.exit(1);
  }
}
