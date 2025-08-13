import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

export const generateText = async (prompt: string) => {
  ai.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });

};
