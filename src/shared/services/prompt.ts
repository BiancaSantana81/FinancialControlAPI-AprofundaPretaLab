import { getAllTransactions } from "../../modules/transactions/transaction";
import { financialAssitant } from "../adapters/gemini";
import { ChatRepository } from "../utils/chatHistory.repository";
import { geminiInteral } from "../utils/gemini";

const chatRepo = new ChatRepository();

export const handleConversation = async (
  prompt: string,
  repo: ChatRepository = chatRepo,                // <-- parâmetro opcional
  transactionContext = getAllTransactions        // <-- parâmetro opcional
) => {
  const transactionData = await transactionContext();

  await repo.createMessage("user", prompt);

  const chatHistory = await repo.getAllMessages("asc");

  const data = await financialAssitant(chatHistory, transactionData);
  const { response } = await geminiInteral(data);

  await repo.createMessage("model", response);

  return {
    response,
    chatHistory,
  };
};

// export const handleConversation = async (prompt: string) => {
//     const transactionData = await transactionContext();

//     await chatRepo.createMessage("user", prompt);

//     const chatHistory = await chatRepo.getAllMessages("asc");

//     const data = await financialAssitant(chatHistory, transactionData);
//     const { response } = geminiInteral(data);

//     await chatRepo.createMessage("model", response);
//     return {
//         response,
//         chatHistory,
//     };
// }
