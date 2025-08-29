import { getAllTransactions } from "../../modules/transactions/transaction";
import { chat, financialAssitant, generateText } from "../adapters/gemini";
import { ChatHistory } from "../utils/chatHistory.model";
import { ChatRepository } from "../utils/chatHistory.repository";
import { geminiInteral } from "../utils/gemini";

const chatRepo = new ChatRepository();
const transactionContext = () => getAllTransactions();

export const handleConversation = async (prompt: string) => {
    const transactionData = await transactionContext();

    await chatRepo.createMessage("user", prompt);

    const chatHistory = await chatRepo.getAllMessages("asc");

    const data = await financialAssitant(chatHistory, transactionData);
    const { response } = await geminiInteral(data);

    await chatRepo.createMessage("model", response);
    return {
        response,
        chatHistory,
    };
}
