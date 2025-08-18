import { chat, generateText } from "../adapters/gemini";
import { geminiInteral } from "../utils/gemini";

const chatHistory: any = [];

function buildMessage(role: string, text: string) {

    chatHistory.push(
        {
            role,
            parts: [{ text }],
        }

    );
}

export const handleConversation = async (prompt: string) => {

    buildMessage("user", prompt);

    const data = await chat(chatHistory);
    const { response } = geminiInteral(data);

    buildMessage("model", response);

    return {
        response,
        chatHistory,
    };
}