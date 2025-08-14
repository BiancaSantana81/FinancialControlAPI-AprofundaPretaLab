import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const geminiClient = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});
console.log('API KEY: ' + process.env.GEMINI_API_KEY);
export const generateText = async (prompt: string) => {
  const result = await geminiClient.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });

  return result;
};
