import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateText = async (prompt: string) => {
  const result = await geminiClient.models.generateContent(
    {
      model: "gemini-2.5-flash",
      contents: prompt
    }
  );

  return result;
};

export const chat = async (prompt: any[]) => {
  const result = await geminiClient.models.generateContent(
    {
      model: "gemini-2.5-flash",
      contents: prompt
    }
  );

  return result;
};
