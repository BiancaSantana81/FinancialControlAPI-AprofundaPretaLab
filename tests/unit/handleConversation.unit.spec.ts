import { handleConversation } from '../../src/shared/services/prompt';
import { financialAssitant } from "../../src/shared/adapters/gemini";
import { geminiInteral } from "../../src/shared/utils/gemini";

jest.mock("../../src/shared/adapters/gemini", () => ({
  __esModule: true,
  financialAssitant: jest.fn(),
}));

jest.mock("../../src/shared/utils/gemini", () => ({
  __esModule: true,
  geminiInteral: jest.fn(),
}));

describe("handleConversation - Unit", () => {
  it("deve retornar um objeto com response e chatHistory", async () => {
    const mockRepo = {
      createMessage: jest.fn().mockResolvedValue(undefined),
      getAllMessages: jest.fn().mockResolvedValue([
        { role: "user", parts: [{ text: "Oi" }] }
      ]),
    };

    const mockTransactions = [
      { valor: 100, categoria: "Salário", data: "2025-01-01", descrição: "Salário", tipo: "entrada" }
    ];
    const mockTransactionContext = jest.fn().mockResolvedValue(mockTransactions);

    (financialAssitant as jest.Mock).mockResolvedValue({ fake: "data" });
    (geminiInteral as jest.Mock).mockResolvedValue({ response: "Olá! Aqui estão seus dados." });

    const result = await handleConversation("Oi", mockRepo, mockTransactionContext);

    expect(mockRepo.createMessage).toHaveBeenCalledTimes(2);
    expect(mockRepo.createMessage).toHaveBeenCalledWith("user", "Oi");
    expect(mockRepo.createMessage).toHaveBeenCalledWith("model", "Olá! Aqui estão seus dados.");
    expect(mockRepo.getAllMessages).toHaveBeenCalledWith("asc");
    expect(mockTransactionContext).toHaveBeenCalled();

    expect(result).toHaveProperty("response", "Olá! Aqui estão seus dados.");
    expect(result).toHaveProperty("chatHistory");
    expect(result.chatHistory).toMatchObject([{ role: "user", parts: [{ text: "Oi" }] }]);
  });
});
