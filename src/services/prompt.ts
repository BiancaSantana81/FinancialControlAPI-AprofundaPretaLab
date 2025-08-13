import { generateText } from "./gemini";
import { geminiInteral } from "../adapters/gemini";

export const ai = async (prompt: string) => {
    const data = await generateText(prompt);
    const response = geminiInteral(data);

    return response;
}