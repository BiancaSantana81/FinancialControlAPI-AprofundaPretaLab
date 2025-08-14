import { chat, generateText } from "./gemini";
import { geminiInteral } from "../adapters/gemini";

const context: any = [];

export const ai = async (prompt: string) => {

    const input = {
        role: "user",
        parts: [{ text: prompt }]
    }

    context.push(input);

    const data = await chat(context);
    const { response } = geminiInteral(data);

    const output = {
        role: "model",
        parts: [{ text: response }]
    }

    context.push(output);

    return {
        response,
        context,
    };
}