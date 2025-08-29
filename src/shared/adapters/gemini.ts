import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Transaction } from "../../modules/transactions/transaction.entitie";

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
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {type: "object", properties: {response: {type: "string"}}},
        systemInstruction: "Você é um assistente de IA útil e amigável.",
      }
    }
  );

  return result;
};

export const financialAssitant = async (prompt: any[], transactions: Transaction[]) => {
  const result = await geminiClient.models.generateContent(
    {
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `Você é uma assitente financeira e vai analisar os dados informados, conforme a solicitaçao do usuário. Os dados informados estão dentro de um array e possuem, valor, categoria, data, descrição e tipo (entrada ou saída). Os dados informados são: ${JSON.stringify(transactions)}`,
      }
    }
  );

  return result;
};

